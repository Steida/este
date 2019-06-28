import React, { FunctionComponent } from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { useAppContext } from '@app/hooks/useAppContext';

type Type = 'text' | 'primary' | 'secondary' | 'danger';

interface ButtonProps extends TouchableOpacityProps {
  type?: Type;
}

export const Button: FunctionComponent<ButtonProps> = props => {
  const { theme } = useAppContext();
  const { disabled, type = 'text', ...rest } = props;

  const getStyle = (type: Type) => {
    const assertNever = (type: never) => {
      throw new Error(`Unexpected Button type: ${type}`);
    };
    switch (type) {
      case 'text':
        return theme.button;
      case 'primary':
        return theme.buttonPrimary;
      case 'secondary':
        return theme.buttonSecondary;
      case 'danger':
        return theme.buttonDanger;
      default:
        return assertNever(type);
    }
  };

  return (
    <TouchableOpacity disabled={disabled} accessibilityRole="button" {...rest}>
      <Text style={[getStyle(type), disabled && theme.buttonDisabled]}>
        {props.children}
      </Text>
    </TouchableOpacity>
  );
};
