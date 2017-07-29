// @flow
import type { Action, FormState } from '../types';
import { createTemp } from '../lib/temp';
import { setForm, disableForm, resetForm, setFormErrors } from '../lib/form';

export type PostFormFields = {|
  text: string,
|};

export type PostsState = {|
  form: FormState<PostFormFields>,
|};

const initialState = {
  form: {
    initial: {
      fields: {
        text: '',
      },
      disabled: createTemp(false),
      appError: null,
      validationErrors: {},
    },
    changed: {},
  },
};

const reducer = (
  state: PostsState = initialState,
  action: Action,
): PostsState => {
  switch (action.type) {
    case 'SET_POST_FORM':
      return setForm(state, 'form', action.fields, action.id);
    case 'CREATE_POST':
      return disableForm(state, 'form');
    case 'CREATE_POST_ERROR':
      return setFormErrors(state, 'form', action.errors);
    case 'CREATE_POST_SUCCESS':
      return resetForm(state, 'form');
    default:
      return state;
  }
};

export default reducer;
