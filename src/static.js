import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import routes from './routes';
import App from './templates/app.jsx';
import IndexRedirect from '../data/redirect.jsx';
import './css';

import 'file?name=CNAME!../CNAME'
import 'file?name=favicon.ico&mimetype=image/x-icon!../favicon.ico'


function buildHTML(props, Component = App) {
    return '<!doctype html>' + renderToStaticMarkup(<Component metadata={props} />);
}

export default function(render, done) {
    render('index.html', buildHTML({}, IndexRedirect));

    routes.forEach(route => {
        console.log('render', route.renderPath);
        render(route.renderPath, buildHTML(route));
    });

    done();
}
