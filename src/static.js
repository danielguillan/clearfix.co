import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import routes from './routes';
import App from './templates/app.jsx';
import './css';

import 'file?name=CNAME!../CNAME'
import 'file?name=favicon.ico&mimetype=image/x-icon!../favicon.ico'


function buildHTML(props) {
    return '<!doctype html>' + renderToStaticMarkup(<App metadata={props} />);
}

export default function(render, done) {
    routes.forEach(route => render(route.renderPath, buildHTML(route)));
    done();
}
