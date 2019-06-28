import { NexusGenAllTypes } from '@app/api/typegen';
import React, { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { Text } from 'react-native';
import { useAppContext } from '@app/hooks/useAppContext';

interface ValidationErrorProps {
  error?:
    | NexusGenAllTypes['EmailError']
    | NexusGenAllTypes['PasswordError']
    | NexusGenAllTypes['Max140CharsError']
    | null
    | '%future added value';
}

export const ValidationError: FunctionComponent<ValidationErrorProps> = ({
  error,
}) => {
  const { theme } = useAppContext();

  const getMessage = () => {
    if (error == null) return null;
    const handleNever = (_: never | '%future added value') => {
      // '%future added value' is reminder that GraphQL services often expand
      // in capabilities and may return new enum values. We have to handle it.
      // https://github.com/facebook/relay/issues/2351#issuecomment-368958022
      return null;
    };
    switch (error) {
      case 'REQUIRED':
        return (
          <FormattedMessage
            id="ValidationError.required"
            defaultMessage="Please fill out this field."
          />
        );
      case 'EMAIL':
        return (
          <FormattedMessage
            id="ValidationError.email"
            defaultMessage="Email address is not valid."
          />
        );
      case 'MIN_5_CHARS':
        return (
          <FormattedMessage
            id="ValidationError.minLength"
            defaultMessage="{minLength} characters minimum."
            values={{ minLength: 5 }}
          />
        );
      case 'MAX_140_CHARS':
      case 'MAX_1024_CHARS':
        return (
          <FormattedMessage
            id="ValidationError.maxLength"
            defaultMessage="{maxLength} characters maximum."
            values={{ maxLength: error === 'MAX_140_CHARS' ? 140 : 1024 }}
          />
        );
      case 'ALREADY_EXISTS':
        return (
          <FormattedMessage
            id="ValidationError.alreadyExists"
            defaultMessage="Already exists."
          />
        );
      case 'NOT_EXISTS':
        return (
          <FormattedMessage
            id="ValidationError.notExists"
            defaultMessage="Not exists."
          />
        );
      case 'WRONG_PASSWORD':
        return (
          <FormattedMessage
            id="ValidationError.wrongPassword"
            defaultMessage="Wrong password."
          />
        );
      default: {
        return handleNever(error);
      }
    }
  };

  return <Text style={theme.validationError}>{getMessage()}</Text>;
};
