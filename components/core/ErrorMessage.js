// @flow
import * as React from 'react';
import Text, { type TextProps } from './Text';
import { FormattedMessage } from 'react-intl';
import type { Max140CharsError } from '../__generated__/CreateWebMutation.graphql';
import type {
  EmailError,
  PasswordError,
} from './__generated__/AuthMutation.graphql';

export type MessageError =
  | '401'
  | '403'
  | '404'
  | 'NET_ERROR'
  | 'UNKNOWN'
  | Max140CharsError
  | EmailError
  | PasswordError;

type ErrorMessageProps = {|
  ...TextProps,
  error: ?MessageError,
|};

class ErrorMessage extends React.PureComponent<ErrorMessageProps> {
  static errorToMessage(error: MessageError) {
    switch (error) {
      case '401':
        return (
          <FormattedMessage
            defaultMessage="Unauthorized."
            id="error.unauthorized"
          />
        );
      case '403':
        return (
          <FormattedMessage defaultMessage="Forbidden." id="error.forbidden" />
        );
      case '404':
        return (
          <FormattedMessage defaultMessage="Not found." id="error.notFound" />
        );
      case 'NET_ERROR':
        return (
          <FormattedMessage
            defaultMessage="Network error. Please try it later."
            id="error.netError"
          />
        );
      case 'UNKNOWN':
        return (
          <FormattedMessage
            defaultMessage="Unknown error."
            id="error.unknown"
          />
        );
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
    const { bold = true, color = 'warning', error, ...props } = this.props;
    if (!error) return null;
    const message = ErrorMessage.errorToMessage(error);
    return (
      <Text bold={bold} color={color} {...props}>
        {message}
      </Text>
    );
  }
}

export default ErrorMessage;
