import React, { PropTypes } from 'react';
import { site } from '../data';
import routes from './routes';
import cx from 'classnames';


export const prettyDate = date => new Date(date).toDateString();
export const stripHTML = str => str.replace(/<(?:.|\n)*?>/gm, '');
export const values = obj => Object.keys(obj).map(k => obj[k]);

export function escapeXML(str) {
  return str.replace(/[<>&'"]/g, c => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
    }
  });
}

export function linkTo(path = '/') {
    if (path[0] !== '/') { path = `/${path}`; }
    return `${site.baseurl}${path}`;
}


export function isCurrent(path = '/') {
    if (path[0] !== '/') { path = `/${path}`; }
    return `${site.baseurl}${path}`;
}

export function Link(props) {
  let fromKey = props.metadata.key;
  let lang = props.metadata.lang;

  let toPageMetadata = routes.find((r) => r.key === props.to && r.lang === lang);
  if (!toPageMetadata) {
    throw new Error(`Specified Link points to undefined route (${props.to})`);
  }

  let urlSlug = toPageMetadata.slug;
  let className = cx(props.className, 'Link', {'is-current' : fromKey === props.to});

  return (<a className={className} href={linkTo(urlSlug)}>{props.children}</a>)
}

Link.propTypes = {
  to: PropTypes.string.isRequired,
  metadata: PropTypes.object.isRequired,
  children: PropTypes.element,
  className: PropTypes.string.isRequired
}

export function SwitchLangLink(props) {
  let fromKey = props.metadata.key;
  let lang = props.metadata.lang;
  let toLang = props.to;

  let toPageMetadata = routes.find((r) => r.key === fromKey && r.lang === toLang);
  if (!toPageMetadata) {
    throw new Error(`Specified Link points to undefined route (${props.to})`);
  }

  let urlSlug = toPageMetadata.slug;
  let className = cx(props.className, 'SwitchLangLink');

  return (<a className={className} href={linkTo(urlSlug)}>{props.children || toLang || null}</a>)
}

SwitchLangLink.propTypes = {
  to: PropTypes.string.isRequired,
  metadata: PropTypes.object.isRequired,
  children: PropTypes.element,
  className: PropTypes.string.isRequired
}