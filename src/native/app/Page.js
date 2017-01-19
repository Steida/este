// @flow
import Header from './Header';
import React from 'react';
import linksMessages from '../../common/app/linksMessages';
import { Box, Match } from '../../common/components';
import { injectIntl } from 'react-intl';

// import { Alert } from './components';

type PageProps = {
  component: () => React.Element<*>,
  exactly?: boolean,
  intl: $IntlShape,
  pattern: string,
};

const titles = {
  '/': linksMessages.home,
  '/intl': linksMessages.intl,
  '/offline': linksMessages.offline,
  '/signin': linksMessages.signIn,
  '/todos': linksMessages.todos,
  '/me': linksMessages.me,
};

const Page = ({
  component: Component,
  exactly,
  intl,
  pattern,
}: PageProps) => (
  <Match
    exactly={exactly}
    pattern={pattern}
    render={renderProps => (
      <Box
        // We need flex and backgroundColor to cover SideMenu.
        backgroundColor="white"
        flex={1}
      >
        {titles[pattern] &&
          <Header title={intl.formatMessage(titles[pattern])} />
        }
        {/* <Alert />*/}
        <Box flex={1}>
          <Component {...renderProps} />
        </Box>
      </Box>
    )}
  />
);

export default injectIntl(Page);
