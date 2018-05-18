// @flow
import * as React from 'react';
import Text, { type TextProps } from './Text';
import { FormattedMessage } from 'react-intl';
import type { ShortStringError } from '../__generated__/CreateWebMutation.graphql';
import * as createWeb from '../__generated__/CreateWebMutation.graphql';
import type {
  EmailError,
  PasswordError,
} from './__generated__/AuthMutation.graphql';

export type Error = ShortStringError | EmailError | PasswordError;

//       <FormattedMessage
//         defaultMessage="Not authorized."
//         id="error.notAuthorized"
//       />
//       <FormattedMessage
//         defaultMessage="Unknown error: {message}"
//         id="error.unknown"
//         values={{ message: error.message }}
//       />
//       <FormattedMessage
//         defaultMessage="Network error. Please try it later."
//         id="error.requestFailed"
//       />

type ErrorMessageProps = {|
  ...TextProps,
  children: ?Error,
|};

class ErrorMessage extends React.PureComponent<ErrorMessageProps> {
  static errorToMessage(error: Error) {
    switch (error) {
      case 'NO_TRAILING_SPACES':
        return (
          <FormattedMessage
            defaultMessage="Please remove trailing whitespaces."
            id="error.trim"
          />
        );
      case 'REQUIRED':
        return (
          <FormattedMessage
            defaultMessage="Please fill out this field."
            id="error.required"
          />
        );
      case 'MIN_5_CHARS':
        return (
          <FormattedMessage
            defaultMessage="{minLength} characters minimum."
            id="error.minLength"
            values={{ minLength: 5 }}
          />
        );
      case 'MAX_140_CHARS':
      case 'MAX_1024_CHARS':
        return (
          <FormattedMessage
            defaultMessage="{maxLength} characters maximum."
            id="error.maxLength"
            values={{ maxLength: error === 'MAX_140_CHARS' ? 140 : 1024 }}
          />
        );
      case 'EMAIL':
        return (
          <FormattedMessage
            defaultMessage="Email address is not valid."
            id="error.email"
          />
        );
      case 'WRONG_PASSWORD':
        return (
          <FormattedMessage
            defaultMessage="Wrong password."
            id="error.wrongPassword"
          />
        );
      case 'ALREADY_EXISTS':
        return (
          <FormattedMessage
            defaultMessage="Already exists."
            id="error.alreadyExists"
          />
        );
      case 'NOT_EXISTS':
        return (
          <FormattedMessage defaultMessage="Not exists." id="error.notExists" />
        );
      default:
        (error: empty);
        return error;
    }
  }

  render() {
    const {
      bold = true,
      color = 'danger',
      children: error,
      ...props
    } = this.props;
    if (!error) return null;
    return (
      <Text bold={bold} color={color} {...props}>
        {ErrorMessage.errorToMessage(error)}
      </Text>
    );
  }
}

export default ErrorMessage;
