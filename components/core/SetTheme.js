// @flow
import * as React from 'react';
import Button from './Button';
import { lightTheme } from '../../themes/theme';
import withTheme, { type Theme } from './withTheme';
import { graphql } from 'react-relay';
import withMutation, { type Commit } from './withMutation';
import * as generated from './__generated__/SetThemeMutation.graphql';

type SetThemeProps = {|
  commit: Commit<generated.SetThemeInput, generated.SetThemeMutationResponse>,
  pending: boolean,
  theme: Theme,
|};

class SetTheme extends React.PureComponent<SetThemeProps> {
  getThemeToogleName() {
    return this.props.theme === lightTheme ? 'dark' : 'light';
  }

  handleButtonPress = () => {
    const themeName = this.getThemeToogleName();
    this.props.commit({ themeName });
  };

  render() {
    const themeName = this.getThemeToogleName();
    return (
      <Button
        color="primary"
        onPress={this.handleButtonPress}
        disabled={this.props.pending}
      >
        {`${themeName} theme`}
      </Button>
    );
  }
}

export default withMutation(
  withTheme(SetTheme),
  graphql`
    mutation SetThemeMutation($input: SetThemeInput!) {
      setTheme(input: $input) {
        user {
          themeName
        }
      }
    }
  `,
);
