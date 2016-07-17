import React from 'react';
import deburr from 'lodash/deburr';
import kebabCase from 'lodash/kebabCase';

import { site } from '../../data';
import Header from './header.jsx';
import Footer from './footer.jsx';


function typekitCode(typekit_id) {
  return (
    `(function(d) {
      var config = {
        kitId: '${typekit_id}',
        scriptTimeout: 3000,
        async: false
      },
      h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
    })(document);`);
}


function analyticsCode(analitycs_id) {
  return (
    `(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

    ga('create', '${analytics_id}', 'auto');
    ga('send', 'pageview');`);
}


export default ({ children, metadata }) => {
  let { t, path } = metadata;

  return (
    <html>
      <head>
        <meta charSet='utf-8' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta name='description' content={t._.meta_description} />
        <link rel='canonical' href={site.url + site.baseurl + path} />
        <title>{`${t.title ? `${t.title} - ` : ''}${t._.title}`}</title>
        {site.typekit_id ? <script dangerouslySetInnerHTML={{ __html: typekitCode(site.typekit_id) }}></script> : null}
        {site.analytics_id ? <script dangerouslySetInnerHTML={{ __html: analyticsCode(site.analytics_id) }}></script> : null}
        <link href={site.baseurl + '/static.css'} rel='stylesheet' type='text/css' />
      </head>
      <body>
        <div className={'Site'}>
          <div className={'Site-nav'}>
            <Header metadata={metadata} />
          </div>
          <div className={'Site-body'}>
            {children}
            <Footer metadata={metadata} />
          </div>
        </div>
      </body>
    </html>
  );
}

