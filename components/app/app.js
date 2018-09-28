// @flow
/* eslint-env browser */
import * as React from 'react';
import createRelayEnvironment from './createRelayEnvironment';
import { type GraphQLTaggedNode } from 'react-relay';
import { fetchQuery } from 'relay-runtime';
import { getCookie } from '../../browser/cookie';
import LocaleContext from '../core/LocaleContext';
import EnvironmentContext from '../core/EnvironmentContext';
import ErrorContext, { type ContextError } from '../core/ErrorContext';
import RelayProvider from '../core/RelayProvider';
import Error from 'next/error';

type AppProps = {|
  token: ?string,
  data: Object,
  initialNow: number,
  locale: string,
  messages: Object,
  records: Object,
  supportedLocales: Array<string>,
  // That's all we support for now. It's good enough.
  statusCode: null | 404,
|};

type AppState = {|
  errorContext: {
    error: ?ContextError,
    dispatchError: ContextError => void,
  },
|};

type AppContext = {|
  pathname: string,
  query: Object,
  asPath: string,
  req: ?{
    ...http$IncomingMessage,
    locale: string,
    localeDataScript: string,
    messages: Object,
    supportedLocales: Array<string>,
  },
  res: ?http$ServerResponse,
  jsonPageRes: Object,
  err: Object,
|};

// TODO: https://github.com/este/este/issues/1524
const app = (
  // The page is stateless because the state belongs to GraphQL or into another component.
  Page: React.StatelessFunctionalComponent<{| data: Object |}>,
  // Page: any,
  options?: {|
    query?: GraphQLTaggedNode,
    mapQueryVariables?: Object => Object,
  |},
) => {
  const { query, mapQueryVariables } = options || {};

  class App extends React.PureComponent<AppProps, AppState> {
    constructor(props: AppProps) {
      super(props);
      this.localeContext = {
        current: props.locale,
        supported: props.supportedLocales,
      };
    }

    // https://reactjs.org/docs/context.html#updating-context-from-a-nested-component
    // dispatchError must be defined before state because of this.dispatchError
    // eslint-disable-next-line react/sort-comp
    dispatchError = (error: ContextError) => {
      const { dispatchError } = this;
      this.setState({ errorContext: { error, dispatchError } });
    };

    state = {
      errorContext: { error: null, dispatchError: this.dispatchError },
    };

    static async getInitialProps(context: AppContext) {
      const cookie = getCookie(context.req);
      const token = cookie && cookie.token;
      const initialNow = Date.now();

      let data = {};
      let records = {};
      let statusCode = null;

      if (query) {
        const rejectErrors = true;
        const environment = createRelayEnvironment({ token, rejectErrors });
        const queryVariables =
          mapQueryVariables != null
            ? mapQueryVariables(context.query)
            : context.query;
        try {
          data = await fetchQuery(environment, query, queryVariables);
        } catch (errors) {
          // We don't care about errors, just render Next.js Error 404 and set
          // response status code. It's good enough for now.
          statusCode = 404;
        }
        records = environment
          .getStore()
          .getSource()
          .toJSON();
      }

      if (statusCode != null && context.res) {
        // eslint-disable-next-line no-param-reassign
        context.res.statusCode = statusCode;
      }

      const { locale, messages, supportedLocales } =
        // eslint-disable-next-line no-underscore-dangle
        context.req || window.__NEXT_DATA__.props.pageProps;

      return ({
        token,
        data,
        initialNow,
        locale,
        messages,
        records,
        supportedLocales,
        statusCode,
      }: AppProps);
    }

    localeContext: { current: string, supported: Array<string> };

    render() {
      if (this.props.statusCode) {
        // https://github.com/este/este/issues/1485
        return <Error statusCode={this.props.statusCode} />;
      }
      const { token, records } = this.props;
      // Must be created in render to get updated records from getInitialProps
      // on the same App instance. It happens when URL query is changed.
      const environment = createRelayEnvironment({ token, records });
      return (
        <ErrorContext.Provider value={this.state.errorContext}>
          <LocaleContext.Provider value={this.localeContext}>
            <EnvironmentContext.Provider value={environment}>
              <RelayProvider environment={environment}>
                <Page data={this.props.data} />
              </RelayProvider>
            </EnvironmentContext.Provider>
          </LocaleContext.Provider>
        </ErrorContext.Provider>
      );
    }
  }

  return App;
};

export default app;
