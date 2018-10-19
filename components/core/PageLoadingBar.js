// @flow
import * as React from 'react';
import NProgress from 'nprogress';
import Router from 'next/router';

// Don't show progress for fast transitions.
const startDelay = 1000;
let timeoutID = null;

Router.events.on('routeChangeStart', () => {
  timeoutID = setTimeout(() => NProgress.start(), startDelay);
});

Router.events.on('routeChangeComplete', () => {
  if (timeoutID) clearTimeout(timeoutID);
  NProgress.done();
});

Router.events.on('routeChangeError', () => {
  if (timeoutID) clearTimeout(timeoutID);
  NProgress.done();
});

type Props = {
  color: string,
};

class PageLoadingBar extends React.PureComponent<Props> {
  render() {
    const { color } = this.props;
    return (
      <style jsx global>{`
        #nprogress {
          pointer-events: none;
        }
        #nprogress .bar {
          background: ${color};
          position: fixed;
          z-index: 1031;
          top: 0;
          left: 0;
          width: 100%;
          height: 2px;
        }
        #nprogress .peg {
          display: block;
          position: absolute;
          right: 0px;
          width: 100px;
          height: 100%;
          box-shadow: 0 0 10px ${color}, 0 0 5px ${color};
          opacity: 1;
          transform: rotate(3deg) translate(0px, -4px);
        }
      `}</style>
    );
  }
}

export default PageLoadingBar;
