import site from './site.yml';
site.baseurl = site.baseurl || '';

const toPath = file => file.replace(/\.\/.*?\//, '/')
                           .replace(/\..*$/, '')
                           .replace(/\index$/, '');

function reduceFn(obj, file) {
  file = { path: toPath(file), ...require(file) };
  return { ...obj, [file.path]: file };
};

const langRegex = /(?:i18n\/)(\w+)(?:\.js)$/i;

const pages = require.context('./', true, /\/pages\/.+\.(md|markdown|html|page\.jsx?)$/).keys().reduce(reduceFn, {});
const posts = {};
const languages = require.context('./', true, /\/i18n\/.+\.js$/).keys().reduce((result, langPath) => {
    const lang = langPath.match(langRegex)[1];
    if (!lang) { return result; }

    result[lang] = require(langPath);
    return result;
}, {});

export default { pages, posts, site, languages };
