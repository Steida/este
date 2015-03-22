import DocumentTitle from 'react-document-title'
import Html from './html'
import Promise from 'bluebird'
import React from 'react'
import Router from 'react-router'
import config from './config'
import routes from '../client/routes'
import state from '../lib/state'

export default function(path, locale) {
  return loadData(path, locale).then(renderPage)
}

function loadData(path, locale) {
  // TODO: Preload and merge user specific state.
  return new Promise((resolve, reject) => {
    resolve({path})
  })
}

function renderPage({path}) {
  return new Promise((resolve, reject) => {
    Router.run(routes, path, (Handler, routerState) => {
      const html = getPageHtml(Handler)
      const isNotFound = routerState.routes.some(route => route.name === 'not-found')
      resolve({
        html: html,
        status: isNotFound ? 404: 200
      })
    })
  })
}

function getPageHtml(Handler) {
  const appHtml = `<div id="app">${React.renderToString(<Handler/>)}</div>`
  const appScriptSrc = config.isProduction
    ? '/build/app.js?v=' + config.version
    : '//localhost:8888/build/app.js'
  let scriptHtml = `
    <script>
      (function() {
        window._appState = ${JSON.stringify(state.toJS())};
        var app = document.createElement('script'); app.type = 'text/javascript'; app.async = true;
        var src = '${appScriptSrc}';
        // IE<11 and Safari need Intl polyfill.
        if (!window.Intl) src = src.replace('.js', 'intl.js');
        app.src = src;
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(app, s);
      })();
    </script>`

  if (config.googleAnalyticsId !== 'UA-XXXXXXX-X')
    scriptHtml += `
      <script>
        (function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
        function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
        e=o.createElement(i);r=o.getElementsByTagName(i)[0];
        e.src='//www.google-analytics.com/analytics.js';
        r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
        ga('create','${config.googleAnalyticsId}');ga('send','pageview');
      </script>`
  const title = DocumentTitle.rewind()

  return '<!DOCTYPE html>' + React.renderToStaticMarkup(
    <Html
      bodyHtml={appHtml + scriptHtml}
      isProduction={config.isProduction}
      title={title}
      version={config.version}
    />
  )
}
