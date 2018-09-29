// @flow
import IntlPolyfill from 'intl';
import accepts from 'accepts';
import glob from 'glob';
import next from 'next';
import path from 'path';
import http from 'http';
import url from 'url';
import fs from 'fs';
import { defaultLocale } from '../constants';

export type ServerProps = {|
  locale: string,
  supportedLocales: Array<string>,
  messages: Object,
  localeDataScript: string,
|};

// Can't be exact type because of http$IncomingMessage.
export type AppReq = {
  ...http$IncomingMessage,
  ...ServerProps,
};

// Polyfill Node with `Intl` that has data for all locales.
// https://formatjs.io/guides/runtime-environments/#server
Intl.NumberFormat = IntlPolyfill.NumberFormat;
Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;

const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev });
const handle = app.getRequestHandler();
const supportedLocales = glob
  .sync('./lang/*.json')
  .map(f => path.basename(f, '.json'));

// We need to expose React Intl's locale data on the request for the user's
// locale. This function will also cache the scripts by lang in memory.
const localeDataCache = new Map();

const getLocaleDataScript = locale => {
  const lang = locale.split('-')[0];
  if (!localeDataCache.has(lang)) {
    const localeDataScript = fs.readFileSync(
      `./node_modules/react-intl/locale-data/${lang}.js`,
      'utf8',
    );
    localeDataCache.set(lang, localeDataScript);
  }
  return localeDataCache.get(lang);
};

const messagesDataCache = new Map();

const getMessages = locale => {
  if (!messagesDataCache.has(locale)) {
    const json = fs.readFileSync(`./lang/${locale}.json`, 'utf8');
    const messages = JSON.parse(json);
    messagesDataCache.set(locale, messages);
  }
  return messagesDataCache.get(locale);
};

const getAcceptedOrDefaultLocale = (req, locale) => {
  // locale=* overrides auto detection.
  // For example: http://localhost:3000/?locale=cs
  if (locale) {
    return supportedLocales.indexOf(locale) !== -1 ? locale : defaultLocale;
  }
  return accepts(req).language(supportedLocales) || defaultLocale;
};

const addIntlProps = (req: http$IncomingMessage) => {
  const { query = {} } = url.parse(req.url, true);
  // TODO: https://github.com/este/este/issues/1399
  const locale = getAcceptedOrDefaultLocale(req, query.locale);
  // Use messages defined in code for dev with default locale.
  const messages =
    dev && locale === defaultLocale ? {} : getMessages(locale) || {};
  const localeDataScript = getLocaleDataScript(locale) || '';
  const props: ServerProps = {
    locale,
    supportedLocales,
    messages,
    localeDataScript,
  };
  // Must be explicitly added to req object for some reason. No shallow copy.
  Object.keys(props).forEach(prop => {
    // $FlowFixMe This is fine.
    req[prop] = props[prop];
  });
};

app.prepare().then(() => {
  http
    .createServer((req, res) => {
      addIntlProps(req);
      handle(req, res);
    })
    .listen('3000', err => {
      if (err) throw err;
      // eslint-disable-next-line no-console
      console.log('> Read on http://localhost:3000');
    });
});
