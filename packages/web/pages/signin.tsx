import React, { FunctionComponent } from 'react';
import { validateSignIn } from '@app/api/validators/validateSignIn';
import { defineMessages, FormattedMessage } from 'react-intl';
import { Platform, TextInput, View } from 'react-native';
import { createFragmentContainer, graphql } from 'react-relay';
import { useAppContext } from '@app/hooks/useAppContext';
import { useAuth } from '@app/hooks/useAuth';
import { useMutation } from '@app/hooks/useMutation';
import { usePageTitles } from '@app/hooks/usePageTitles';
import { Button } from '@app/components/Button';
import { Layout } from '@app/components/Layout';
import { ValidationError } from '@app/components/ValidationError';
import { signinMutation } from '@app/relay/generated/signinMutation.graphql';
import { signin_data } from '@app/relay/generated/signin_data.graphql';

const mutation = graphql`
  mutation signinMutation($input: SignInInput!) {
    signIn(input: $input) {
      token
      errors {
        email
        password
      }
    }
  }
`;

const messages = defineMessages({
  emailPlaceholder: {
    defaultMessage: 'email',
    id: 'emailPlaceholder',
  },
  passwordPlaceholder: {
    defaultMessage: 'password',
    id: 'passwordPlaceholder',
  },
});

interface SignIn {
  data: signin_data;
}

const SignIn: FunctionComponent<SignIn> = ({ data }) => {
  const { intl, theme } = useAppContext();
  const auth = useAuth();
  const pageTitles = usePageTitles();
  const { fields, commit, errors, pending } = useMutation<signinMutation>(
    mutation,
    {
      createAccount: false,
      email: '',
      password: '',
    },
    { validator: validateSignIn },
  );

  const signIn = (createAccount = false) => {
    commit({
      merge: { createAccount },
      onSuccess({ token }) {
        if (token == null) return;
        auth.signIn(token);
      },
    });
  };

  return (
    <Layout title={pageTitles.signIn} data={data}>
      <TextInput
        {...fields.email.textInput}
        placeholder={intl.formatMessage(messages.emailPlaceholder)}
        keyboardType="email-address"
        onSubmitEditing={() => signIn()}
        style={theme.textInputOutline}
        {...Platform.select({
          web: { name: 'email', autoComplete: 'email' },
        })}
      />
      <ValidationError error={errors.email} />
      <TextInput
        {...fields.password.textInput}
        placeholder={intl.formatMessage(messages.passwordPlaceholder)}
        secureTextEntry
        onSubmitEditing={() => signIn()}
        style={theme.textInputOutline}
        {...Platform.select({
          web: { name: 'password' },
        })}
      />
      <ValidationError error={errors.password} />
      <View style={theme.buttons}>
        <Button type="primary" onPress={() => signIn()} disabled={pending}>
          <FormattedMessage defaultMessage="Sign In" id="signIn" />
        </Button>
        <Button
          type="secondary"
          onPress={() => signIn(true)}
          disabled={pending}
        >
          <FormattedMessage defaultMessage="Sign Up" id="signUp" />
        </Button>
      </View>
    </Layout>
  );
};

// eslint-disable-next-line import/no-default-export
export default createFragmentContainer(SignIn, {
  data: graphql`
    fragment signin_data on Query {
      ...Layout_data
    }
  `,
});
