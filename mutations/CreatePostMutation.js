// @flow
import type {
  CreatePostMutationResponse,
  CreatePostMutationVariables,
} from './__generated__/CreatePostMutation.graphql';
import type { Environment, Id } from '../types';
import type { PostFormFields } from '../reducers/posts';
import commitMutation from './_commitMutation';
import { ConnectionHandler } from 'relay-runtime';
import { graphql } from 'react-relay';

const mutation = graphql`
  mutation CreatePostMutation($input: CreatePostInput!) {
    createPost(input: $input) {
      # Don't know what to return? Check data/schema.graphql.
      # Remember, ask for data needed for the updater.
      edge {
        node {
          ...Post_post
        }
      }
    }
  }
`;

const updater = (store, viewerId, edge) => {
  const userProxy = store.get(viewerId);
  const connection = ConnectionHandler.getConnection(
    userProxy,
    'Posts_allPosts',
    // https://github.com/facebook/relay/issues/1808#issuecomment-304519883
    { orderBy: 'createdAt_DESC' },
  );
  ConnectionHandler.insertEdgeBefore(connection, edge);
};

// Should not be required, but it is. Relay Modern always sends "0", but it
// can't be a constant, because it's used for optimistic mutations.
// Hope Relay Modern will remove it soon.
let clientMutationId = 0;

const commit = (
  environment: Environment,
  viewerId: Id,
  fields: PostFormFields,
): Promise<CreatePostMutationResponse> =>
  commitMutation(environment, {
    mutation,
    variables: ({
      input: {
        ...fields,
        clientMutationId: (clientMutationId++).toString(),
      },
    }: CreatePostMutationVariables),
    updater: store => {
      const payload = store.getRootField('createPost');
      const edge = payload.getLinkedRecord('edge');
      updater(store, viewerId, edge);
    },
  });

export default { commit };
