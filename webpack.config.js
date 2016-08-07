var qs = require('qs');
var autoprefixer = require('autoprefixer');
var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var StaticWebpackPlugin = require('static-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var Clean = require('clean-webpack-plugin');
var _ = require('lodash');


function imagesLoaderConfig(basePath, options) {
  return {
        test: new RegExp(basePath + '.+\.(jpe?g|png|gif|svg)$', 'i'),
        loaders: [
            // inline base64 URLs for <=8k images. If the file is greater than
            // the limit the file-loader is used and all query parameters are passed to it.
            // To disable replace 'url-loader?' by 'file-loader?'
            'url-loader?' + qs.stringify(_.assign({
              limit: 8192,
              hash: 'sha512',
              digest: 'hex',
              context: basePath,
              name: '[path][name].[ext]'
            }, options)),
            'image-webpack?' + JSON.stringify({
              bypassOnDebug: true,
              progressive: true,
              optimizationLevel: 8,
              interlaced: false,
              pngquant: { quality: '65-90', speed: 4 }
            })
        ]
    };
}

function devServerConfig() {
    return {
        historyApiFallback: true,
        // hot: true,
        progress: true,
        stats: 'errors-only'
    };
}


var extractMainCSS = new ExtractTextPlugin('[name].css', {
  allChunks: true
});


function baseConfig() {
  var c = {
    entry: {
      'static': './src/static.js'
    },
    output: {
      path: './public',
      libraryTarget: 'umd',
      filename: '[name].js',
      publicPath: '/'
    },
    module: {
      loaders: [
        { test: /\.jsx?$/, loader: 'babel', exclude: /node_modules/ },
        { test: /\.yml$/,  loader: 'json!yaml' },
        { test: /\.page\.jsx?$/, loader: require.resolve('./lib/jsx-loader.js'), include: [/data\/pages/] },
        { test: /\.(md|html)$/, loader: require.resolve('./lib/markdown-loader.js') },
        { test: /\.scss$/, loader: [
                      'file-loader?' + qs.stringify({ name: 'css/[name].css', mimetype: 'text/css'}),
                      'extract-loader',
                      'css-loader?sourceMap',
                      'postcss-loader',
                      'sass-loader'
                    ].join('!'),
          include: /data/
        },
        { test: /\.css$/,  loader: [
                      'file-loader?' + qs.stringify({ name: 'css/[name].css', mimetype: 'text/css'}),
                      'extract-loader',
                      'css-loader?' + qs.stringify({ sourceMap: 1, importLoaders: 1 }),
                      'postcss-loader'
                    ].join('!'),
          include: /data/
        },
        imagesLoaderConfig('data/posts'),
        imagesLoaderConfig('data/pages'),

        {
            test: /\.scss$/,
            loader: extractMainCSS.extract('style-loader', [
                      'css-loader?sourceMap',
                      'postcss-loader',
                      'sass-loader'
                    ].join('!')),
            exclude: /data/
        },
        {
            test: /\.css$/,
            loader: extractMainCSS.extract('style-loader', [
                'css-loader?' + qs.stringify({ sourceMap: 1, importLoaders: 1 }),
                'postcss-loader'
            ].join('!')),
            exclude: /data/
        },
        imagesLoaderConfig('src/images', {name: 'images/[name].[ext]'})
      ]
    },
    resolve: {
      extensions: ['', '.js', '.jsx', '.json', '.scss', '.css', '.md'],
      modulesDirectories: ['node_modules', 'src'],
    },
    postcss: [autoprefixer],
    plugins: [
      new webpack.NoErrorsPlugin(),
      extractMainCSS,
      new StaticWebpackPlugin('static.js'),
      new Clean(['public'])
    ],
    'markdown-it': {
      html: true,
      typographer: true,
      linkify: true,
      breaks: true,
      use: [
        [require("markdown-it-anchor"), {
          permalink: true,
          permalinkBefore: true
        }],
        [require("markdown-it-table-of-contents"), {
          includeLevel: [2, 3, 4]
        }],
        require('markdown-it-video')
      ]
    },
    stats: {
        colors: true,
        reasons: true,
        hash: false,
        modulesSort: 'name'
    }
  };

  return c;
}

function devConfig() {
    return webpackMerge(baseConfig(), {
        debug: true,
        devtool: 'cheap-module-eval-source-map',
        devServer: devServerConfig()
    });
}

function prodConfig() {
    return webpackMerge(baseConfig(), {
        plugins: [
            //optimize
            new webpack.optimize.UglifyJsPlugin({ minimize: true }),
            new webpack.optimize.OccurrenceOrderPlugin(),
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            })
        ]
    });
}


var registry = {
    'base': baseConfig,
    'dev': devConfig,
    'prod': prodConfig
};

function getConfig(options) {
  options || (options = {});
  var env = options.env || process.env.WEBPACK_TARGET || 'prod';

  if (!registry[env]) {
      throw new Error('No webpack config found for webpack environment: ' + env);
  }

  return registry[env]();
}

module.exports = getConfig();