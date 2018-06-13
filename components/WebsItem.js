// @flow
import * as React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import * as generated from './__generated__/WebsItem.graphql';
import Text from './core/Text';
import A from './core/A';
import Block from './core/Block';
import { FormattedRelative } from 'react-intl';
import WebsItemDelete from './WebsItemDelete';

type WebsItemProps = {|
  data: generated.WebsItem,
|};

class WebsItem extends React.PureComponent<WebsItemProps> {
  render() {
    const { data } = this.props;
    const pageId = data.pages && data.pages[0].id;
    // No page nothing to edit.
    if (pageId == null) return null;
    return (
      <Block>
        <A href={{ pathname: '/edit', query: { pageId } }} prefetch>
          {data.name}
        </A>
        <Text color="gray" size={-1}>
          <FormattedRelative value={data.updatedAt} />
          <Text>
            {', '}
            <WebsItemDelete id={data.id} />
          </Text>
        </Text>
      </Block>
    );
  }
}

export default createFragmentContainer(
  WebsItem,
  graphql`
    fragment WebsItem on Web {
      updatedAt
      name
      id
      pages(first: 1, orderBy: updatedAt_ASC) {
        id
      }
    }
  `,
);
