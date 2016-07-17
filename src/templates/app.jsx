import React from 'react';
import { pages } from '../../data';
import Layout from './layout.jsx';
import Page from './page.jsx';

export default (props) => {
    let { path, lang, key, t } = props.metadata;

    return (
        <Layout {...props} >
            <div className="Body" lang={lang}>
            {
                pages[path] && <Page path={path} page={pages[path]} metadata={props.metadata} />
            }
            </div>
        </Layout>
    );
}

