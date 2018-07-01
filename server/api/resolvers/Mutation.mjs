// @flow
import bcrypt from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import * as validations from '../../../validations';
/*::
import * as generated from '../__generated__/api.graphql'
*/

const Mutation /*: generated.Mutation */ = {
  auth: async (args, info, { db }) => {
    // Email and password must be trimmed before the validation.
    // This is the pattern. Trim what must be stored trimmed.
    const input = {
      // Note we can't use object spread because of Webpack 3
      isSignUp: args.input.isSignUp,
      email: args.input.email.trim(),
      password: args.input.password.trim(),
    };
    const errors = validations.validateAuth(input);
    if (errors) return { errors };
    const createAuthPayload = user => ({
      token: jsonwebtoken.sign(
        { userId: user.id },
        process.env.API_SECRET || '',
      ),
    });
    if (input.isSignUp) {
      const exists = await db.exists.User({ email: input.email });
      if (exists)
        return {
          errors: {
            email: 'ALREADY_EXISTS',
          },
        };
      const password = await bcrypt.hash(input.password, 10);
      const user = await db.mutation.createUser({
        data: { email: input.email, password },
      });
      return createAuthPayload(user);
    }
    const user = await db.query.user({
      where: { email: input.email },
    });
    if (!user)
      return {
        errors: { email: 'NOT_EXISTS' },
      };
    const valid = await bcrypt.compare(input.password, user.password);
    if (!valid)
      return {
        errors: { password: 'WRONG_PASSWORD' },
      };
    return createAuthPayload(user);
  },

  // Note the resolver is as minimal as possible. No userId? Return null. Easy.
  // Permissions are defined in server/api/permissions/index with
  // graphql-shield, so clients can handle errors properly.
  createWeb: async (args, info, { userId, db }) => {
    if (userId == null) return null;
    const errors = validations.validateCreateWeb(args.input);
    if (errors) return { errors };
    const web = await db.mutation.createWeb(
      {
        data: {
          name: args.input.name,
          creator: { connect: { id: userId } },
          posts: {
            create: {
              name: args.input.postName,
              creator: { connect: { id: userId } },
            },
          },
        },
      },
      `
        {
          id
          posts {
            id
          }
        }
      `,
    );
    const postId = web.posts && web.posts[0].id;
    if (postId != null) {
      await db.mutation.updatePost({
        data: {
          contentChildren: {
            create: {
              creator: { connect: { id: userId } },
              web: { connect: { id: web.id } },
              contentType: 'TEXT',
            },
          },
        },
        where: {
          id: postId,
        },
      });
    }
    return {
      postId: web.posts && web.posts[0].id,
    };
  },

  deleteWeb: async (args, info, { db }) => {
    const web = await db.mutation.deleteWeb({
      where: { id: args.input.id },
    });
    if (web == null) return null;
    return { web };
  },

  setTheme: async (args, info, { userId, db }) => {
    if (userId == null) return null;
    const user = await db.mutation.updateUser({
      data: { themeName: args.input.themeName },
      where: { id: userId },
    });
    if (user == null) return null;
    return { user };
  },

  setPostName: async (args, info, { db }) => {
    const errors = validations.validateSetPostName(args.input);
    if (errors) return { errors };
    const post = await db.mutation.updatePost({
      where: { id: args.input.id },
      data: { name: args.input.name },
    });
    if (post == null) return null;
    return { post };
  },

  setWebName: async (args, info, { db }) => {
    const errors = validations.validateSetWebName(args.input);
    if (errors) return { errors };
    const web = await db.mutation.updateWeb({
      where: { id: args.input.id },
      data: { name: args.input.name },
    });
    if (web == null) return null;
    return { web };
  },
};

export default Mutation;
