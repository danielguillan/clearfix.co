import React from 'react';
import cx from 'classnames';
import { Link, SwitchLangLink } from 'utils';


function Logo(props) {
  let { tagline } = props;

  return (
    <div className={cx('Logo', props.className)}>
      <h1 className="Logo-brand">Clear<span/>fix</h1>
      {tagline && <p className="Logo-tagline">{tagline}</p>}
    </div>
  );
}

export default ({metadata}) => {
  let { lang, t } = metadata;

  return (
    <header className='Header'>
      <div className='Topbar'>
        <p className='Topbar-topics'>
          {`Let's talk about`}<span>performance</span>
        </p>
        <nav className='Topbar-langNav'>
          <SwitchLangLink to={lang === 'es' ? 'en' : 'es'} metadata={metadata} />
        </nav>
      </div>
      <div className='Intro'>
        <Logo className='Intro-logo' tagline={t._.logo_tagline} />
      </div>
    </header>
  )
}


// <div className='Header-logo'>
//   <a href='./'>
//     <img src={require('../images/clearfix-logo.png')} />
//   </a>
// </div>

// <div className='Header-tagline'>
//   <p>{t._.tagline}</p>
// </div>