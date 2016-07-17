import React from 'react';
import { linkTo, Link, SwitchLangLink } from 'utils';

export default ({metadata}) => {
  let { lang, t } = metadata;

  return (
    <header className='Header'>
      <SwitchLangLink className='Header-lang' to={lang === 'es' ? 'en' : 'es'} metadata={metadata} />

      <a href='./' className='Header-logo'>
        <img src={require('../images/clearfix-logo.png')} />
      </a>

      <p className='Header-tagline'>{t._.tagline}</p>

      <nav className='Header-menu Menu'>
        <Link className={'Menu-link'} to={''} metadata={metadata}>Home</Link>
        <Link className={'Menu-link'} to={'about'} metadata={metadata}>About</Link>
      </nav>
    </header>
  )
}