// @flow
import * as React from 'react';
import { View, findNodeHandle } from 'react-native';
import withTheme, { type Theme } from '../core/withTheme';
import EditorMarkdown from './EditorMarkdown';
import Heading from '../core/Heading';
import { createFragmentContainer, graphql } from 'react-relay';
import * as generated from './__generated__/Editor.graphql';

export const getFocusableNodes = (instance: Object): Array<HTMLElement> => {
  const node = findNodeHandle(instance);
  // TODO: React Native
  if (node == null || typeof node === 'number') return [];
  if (typeof node.querySelectorAll !== 'function') return [];
  return [...node.querySelectorAll('[data-focusable="true"]')];
};

type EditorProps = {|
  theme: Theme,
  data: generated.Editor,
|};

class Editor extends React.PureComponent<EditorProps> {
  componentDidMount() {
    const first = getFocusableNodes(this)[0];
    if (first) first.focus();
  }
  render() {
    const { page } = this.props.data;
    if (page == null) return null;
    const { theme } = this.props;
    return (
      <View style={theme.styles.editor}>
        <Heading size={1}>{page.title}</Heading>
        <EditorMarkdown />
      </View>
    );
  }
}

export default createFragmentContainer(
  withTheme(Editor),
  graphql`
    fragment Editor on Query @argumentDefinitions(pageId: { type: "ID!" }) {
      page(pageId: $pageId) {
        title
      }
    }
  `,
);
