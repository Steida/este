// @flow
import Raven from 'raven-js';

/*
  Errors reported:
    - global unhandled via Raven install.
    - Relay queries and mutations via createRelayEnvironment.

  This should cover everything important. We don't have to check app state,
  because it's an implementation detail.
  As for epics, they are for business rules errors, not for real app errors.
  It should be ensured via Errors<*> type.

  TODO:
   - Handle server.js errors.
   - Handle rendering errors via React 16
*/

// https://gist.github.com/impressiver/5092952
const clientIgnores = {
  ignoreErrors: [
    'top.GLOBALS',
    'originalCreateNotification',
    'canvas.contentDocument',
    'MyApp_RemoveAllHighlights',
    'http://tt.epicplay.com',
    "Can't find variable: ZiteReader",
    'jigsaw is not defined',
    'ComboSearch is not defined',
    'http://loading.retry.widdit.com/',
    'atomicFindClose',
    'fb_xd_fragment',
    'bmi_SafeAddOnload',
    'EBCallBackMessageReceived',
    'conduitPage',
    'Script error.',
  ],
  ignoreUrls: [
    // Facebook flakiness
    /graph\.facebook\.com/i,
    // Facebook blocked
    /connect\.facebook\.net\/en_US\/all\.js/i,
    // Woopra flakiness
    /eatdifferent\.com\.woopra-ns\.com/i,
    /static\.woopra\.com\/js\/woopra\.js/i,
    // Chrome extensions
    /extensions\//i,
    /^chrome:\/\//i,
    // Other plugins
    /127\.0\.0\.1:4001\/isrunning/i, // Cacaoweb
    /webappstoolbarba\.texthelp\.com\//i,
    /metrics\.itunes\.apple\.com\.edgesuite\.net\//i,
  ],
};

let IsomorphicRaven = null;

// Install Raven ASAP.
if (process.browser) {
  IsomorphicRaven = Raven;
  IsomorphicRaven.config(SENTRY_CLIENT_DNS, {
    ...clientIgnores,
    release: APP_VERSION,
  }).install();
} else if (SENTRY_SERVER_DNS) {
  // https://arunoda.me/blog/ssr-and-server-only-modules
  // eslint-disable-next-line no-eval
  IsomorphicRaven = eval("require('raven')");
  IsomorphicRaven.config(SENTRY_SERVER_DNS, {
    release: APP_VERSION,
  }).install();
}

const captureMessage = (message, error) => {
  if (!IsomorphicRaven) return;
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.warn('Fix it, or it will be reported on production.');
    // eslint-disable-next-line no-console
    console.log(error);
    return;
  }
  Raven.captureMessage(message, { error });
};

export const reportRelayFetchError = (error: Object) => {
  // TODO: Ignore irrelevant errors.
  captureMessage('relay fetch error', error);
};
