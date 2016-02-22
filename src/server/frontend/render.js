import 'babel-polyfill';
import Helmet from 'react-helmet';
import Html from './Html.react';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import config from '../config';
import configureStore from '../../common/configureStore';
import createRoutes from '../../browser/createRoutes';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { createMemoryHistory, match, RouterContext } from 'react-router';
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux';

const fetchComponentDataAsync = async (dispatch, renderProps) => {
  const { components, location, params } = renderProps;
  const promises = components
    .reduce((actions, component) => {
      if (typeof component === 'function') {
        actions = actions.concat(component.fetchActions || []);
      } else {
        Object.keys(component).forEach(c => {
          actions = actions.concat(component[c].fetchActions || []);
        });
      }
      return actions;
    }, [])
    .map(action =>
      // Server side fetching can use only router location and params props.
      // There is no easy way how to support custom component props.
      dispatch(action({ location, params })).payload.promise
    );
  await Promise.all(promises);
};

const getAppContainer = (state, store, renderProps) =>
  <div id="app" data-initial-state={JSON.stringify(state)}>
    <Provider store={store}>
      <IntlProvider>
        <RouterContext {...renderProps} />
      </IntlProvider>
    </Provider>
  </div>;

const getScripts = (appJsFilename) =>
  // Note how we use cdn.polyfill.io, en is default, but can be changed later.
  <div>
    <script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=Intl.~locale.en"></script>
    <script src={appJsFilename}></script>
  </div>;

const renderPage = (store, renderProps) => {
  const state = store.getState();
  const appContainer = getAppContainer(state, store, renderProps);
  const helmet = Helmet.rewind();
  const {
    styles: { app: appCssFilename },
    javascript: { app: appJsFilename }
  } = webpackIsomorphicTools.assets();
  const scripts = getScripts(appJsFilename);
  if (!config.isProduction) {
    webpackIsomorphicTools.refresh();
  }
  const docHtml = ReactDOMServer.renderToStaticMarkup(
    <Html
      appCssFilename={appCssFilename}
      googleAnalyticsId={config.googleAnalyticsId}
      helmet={helmet}
      isProduction={config.isProduction}
    >
      {appContainer}
      {scripts}
    </Html>
  );
  return `<!DOCTYPE html>${docHtml}`;
};

export default function render(req, res, next) {
  // Detect Heroku protocol
  const protocol = req.headers['x-forwarded-proto'] || req.protocol;
  const initialState = {
    device: {
      isMobile: ['phone', 'tablet'].indexOf(req.device.type) > -1,
      host: `${protocol}://${req.headers.host}`
    }
  };
  const memoryHistory = createMemoryHistory(req.path);
  const store = configureStore({
    initialState,
    platformMiddleware: [routerMiddleware(memoryHistory)]
  });
  const history = syncHistoryWithStore(memoryHistory, store);
  // Fetch and dispatch current user here because routes may need it.
  const routes = createRoutes(() => store.getState());
  const location = req.url;

  match({ history, routes, location }, async (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(301, redirectLocation.pathname + redirectLocation.search);
      return;
    }

    if (error) {
      next(error);
      return;
    }

    try {
      await fetchComponentDataAsync(store.dispatch, renderProps);
      const html = renderPage(store, renderProps, req);
      // renderProps are always defined with * route.
      // https://github.com/rackt/react-router/blob/master/docs/guides/advanced/ServerRendering.md
      const status = renderProps.routes.some(route => route.path === '*')
        ? 404
        : 200;
      res.status(status).send(html);
    } catch (e) {
      next(e);
    }
  });
}
