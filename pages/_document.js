// @flow
import * as React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { AppRegistry } from 'react-native-web';

// https://github.com/zeit/next.js/tree/master/examples/with-react-native-web
// https://github.com/zeit/next.js/tree/master/examples/with-react-intl

let index = 0;

// Force Next-generated DOM elements to fill their parent's height.
// Not required for using of react-native-web, but helps normalize
// layout for top-level wrapping elements.
// Disable input, textarea outline because blinking caret is enough.
const normalizeNextElements = `
  body > div:first-child,
  #__next {
    height: 100%;
  }
  input, textarea {
    outline: none;
  }
`;

export default class MyDocument extends Document {
  static async getInitialProps(context: Object) {
    AppRegistry.registerComponent('Main', () => Main);
    const { getStyleElement } = AppRegistry.getApplication('Main');
    const props = await super.getInitialProps(context);
    const {
      req: { locale, localeDataScript /*, supportedLocales */ },
    } = context;
    const styles = [
      <style
        key={index++}
        dangerouslySetInnerHTML={{ __html: normalizeNextElements }}
      />,
      ...React.Children.toArray(getStyleElement()),
    ];

    return {
      ...props,
      locale,
      localeDataScript,
      // supportedLocales,
      styles,
    };
  }

  render() {
    const { locale, localeDataScript /*, supportedLocales */ } = this.props;

    return (
      <html lang={locale} style={{ height: '100%', width: '100%' }}>
        <Head>
          {/* {supportedLocales.map(() => {
            // TODO: https://github.com/este/este/issues/1399
            return (
              <link
            href={`https://${locale}.${'deployDomainHere'}`}
            hrefLang={locale}
            key={locale}
            rel="alternate"
              />
            );
          })} */}
        </Head>
        <body style={{ height: '100%', width: '100%', overflowY: 'scroll' }}>
          <Main />
          <script dangerouslySetInnerHTML={{ __html: localeDataScript }} />
          <NextScript />
        </body>
      </html>
    );
  }
}
