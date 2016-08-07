import React from 'react';
import { site } from '../../data';
import { Link } from 'utils';

const GITHUB_FOLLOW_SNIPPET = `<iframe src="https://ghbtns.com/github-btn.html?user=${site.github_username}&type=follow&count=true" frameborder="0" scrolling="0" width="170px" height="20px"></iframe>`
const TWITTER_FOLLOW_SNIPPET = `<a href="https://twitter.com/${site.twitter_username}" class="twitter-follow-button" data-show-count="false"></a>
  <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>`

export default ({metadata}) =>
  <footer className={'Footer'}>
    <nav>
      <Link to={''} metadata={metadata}>Home</Link>
      <Link to={'about'} metadata={metadata}>About</Link>
    </nav>

    {site.github_username ? <div className={'github-follow'} dangerouslySetInnerHTML={{ __html: GITHUB_FOLLOW_SNIPPET }} /> : null}
    {site.twitter_username ? <div className={'twitter-follow'} dangerouslySetInnerHTML={{ __html: TWITTER_FOLLOW_SNIPPET }} /> : null}
  </footer>