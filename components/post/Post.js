// @flow
import * as React from 'react';
import { View } from 'react-native';
import withTheme, { type Theme } from '../core/withTheme';
import PostMarkdown from './PostMarkdown';
import { createFragmentContainer, graphql } from 'react-relay';
import * as generated from './__generated__/Post.graphql';
import PostName from './PostName';
import Head from 'next/head';
import EditMainNav from '../EditMainNav';
import Row from '../core/Row';
import A from '../core/A';

const PostParents = ({ parents }) => (
  <Row>
    {parents.map(({ id, name }) => (
      <A href={{ pathname: '/post', query: { id } }} prefetch key={id}>
        {name}
      </A>
    ))}
  </Row>
);

type PostProps = {|
  theme: Theme,
  data: generated.Post,
|};

class Post extends React.PureComponent<PostProps> {
  // Next.js Head title requires string.
  static getTitle(post): string {
    if (post.name != null) return post.name;
    if (post.contentText != null) return post.contentText;
    return post.id;
  }

  render() {
    const {
      theme,
      data: { post },
    } = this.props;
    if (post == null) return null;
    const title = Post.getTitle(post);
    return (
      <>
        <Head>
          <title>{title}</title>
        </Head>
        <EditMainNav webId={post.web.id} webName={post.web.name} />
        <View style={theme.styles.post}>
          {post.name != null && (
            <PostName postId={post.id} defaultValue={post.name} />
          )}
          {post.parents != null && <PostParents parents={post.parents} />}
          <PostMarkdown />
        </View>
      </>
    );
  }
}

export default createFragmentContainer(
  withTheme(Post),
  graphql`
    fragment Post on Query @argumentDefinitions(id: { type: "ID!" }) {
      post(id: $id) {
        id
        name
        web {
          id
          name
        }
        parents {
          id
          name
        }
        contentType
        contentChildren {
          id
          name
          contentType
        }
        contentChildrenOrder
        contentText
        contentTextFormat
        contentImage {
          id
        }
      }
    }
  `,
);
