// @flow
import type {
  Epic,
  // Errors,
  // User,
} from '../types';
import { Observable } from 'rxjs/Observable';
// import validate, { required } from '../lib/validate';

// const createPost = (getNow, createUuid, form): User => {
//   const now = getNow();
//   return {
//     ...form,
//     id: createUuid(),
//     createdAt: now,
//     updatedAt: now,
//   };
// };

// const validateUser = user => {
//   const validationErrors = validate(user, {
//     name: [required(), minLength(), maxLength()],
//     email: [email(), maxLength()],
//     isAnarchist: [requiredAgree()],
//   });
//   if (!validationErrors) return Observable.of(user);
//   const errors: Errors<User> = { validationErrors };
//   return Observable.throw(errors);
// };

export const createPost: Epic = (
  action$ /* , { createUuid, getNow, getState } */,
) =>
  action$.filter(action => action.type === 'CREATE_POST').mergeMap(action => {
    // https://flow.org/en/docs/lang/refinements
    if (action.type !== 'CREATE_POST') throw Error();

    // rename to create post

    // environment jako deps, pac vse pujde pres action, protoze async, ok
    // import CreatePostMutation from '../mutations/CreatePostMutation';
    // odpalit akci, a v epicu handlovat mutation
    // CreatePostMutation.commit(environment, text)

    return Observable.of(action.fields).mapTo({ type: 'CREATE_POST_SUCCESS' });
    // const user = createUser(getNow, createUuid, action.fields);
    //
    // // Validate object first, then app rules, then do async.
    // return Observable.of(user)
    //   .mergeMap(validateUser)
    //   .mergeMap(validateUsersLocalLength(getState().users.local))
    //   .mergeMap(simulateUserSave)
    //   .mapTo({ type: 'CREATE_USER_SUCCESS', user })
    //   .catch((errors: Errors<User>) =>
    //     Observable.of({ type: 'CREATE_USER_ERROR', errors }),
    //   );
  });
