// @flow
import * as React from 'react';
import * as validation from '../validation';
import Text, { type TextProps } from './Text';
import { FormattedMessage } from 'react-intl';

type ValidationErrorProps = {
  error: ?validation.ValidationError,
} & TextProps;

export const getValidationErrorMessage = (
  error: validation.ValidationError,
) => {
  switch (error.type) {
    case 'required':
      return (
        <FormattedMessage
          defaultMessage="Please fill out this field."
          id="validationError.required"
        />
      );
    case 'minLength':
      return (
        <FormattedMessage
          defaultMessage="{minLength} characters minimum."
          id="validationError.minLength"
          values={{ minLength: error.minLength }}
        />
      );
    case 'maxLength':
      return (
        <FormattedMessage
          defaultMessage="{maxLength} characters maximum."
          id="validationError.maxLength"
          values={{ maxLength: error.maxLength }}
        />
      );
    case 'email':
      return (
        <FormattedMessage
          defaultMessage="Email address is not valid."
          id="validationError.email"
        />
      );
    case 'alreadyExists':
      return (
        <FormattedMessage
          defaultMessage="Already exists."
          id="validationError.alreadyExists"
        />
      );
    case 'notExists':
      return (
        <FormattedMessage
          defaultMessage="Not exists."
          id="validationError.notExists"
        />
      );
    case 'wrongPassword':
      return (
        <FormattedMessage
          defaultMessage="Wrong password."
          id="validationError.wrongPassword"
        />
      );
    case 'notAuthorized':
      return (
        <FormattedMessage
          defaultMessage="Not authorized."
          id="validationError.notAuthorized"
        />
      );
    case 'unknownError':
      return (
        <FormattedMessage
          defaultMessage="Unknown error: {message}"
          id="validationError.unknownError"
          values={{ message: error.message }}
        />
      );
    case 'trim':
      return (
        <FormattedMessage
          defaultMessage="Please remove trailing whitespaces."
          id="validationError.trim"
        />
      );
    case 'requestFailed':
      return (
        <FormattedMessage
          defaultMessage="Network error. Please try it later."
          id="validationError.requestFailed"
        />
      );

    default:
      // https://flow.org/en/docs/react/redux/#toc-typing-redux-reducers
      // eslint-disable-next-line no-unused-expressions
      (error: empty);
      return null;
  }
};

class ValidationError extends React.PureComponent<ValidationErrorProps> {
  render() {
    const { error, bold = true, color = 'danger', ...props } = this.props;
    if (!error) return null;
    return (
      <Text bold={bold} color={color} {...props}>
        {getValidationErrorMessage(error)}
      </Text>
    );
  }
}

export default ValidationError;
