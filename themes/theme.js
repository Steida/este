// @flow
import type { Theme, OpenColor } from './types';
import createTypography from './createTypography';
import openColor from 'open-color';
import { StyleSheet } from 'react-native';

const openColorTyped: OpenColor = openColor;

const typography = createTypography({
  fontSize: 16,
  fontSizeScale: 'step5', // perfect fourth, modularscale.com
  lineHeight: 24,
});

const colors = {
  primary: openColorTyped.blue[6],
  success: openColorTyped.green[5],
  warning: openColorTyped.orange[6],
  danger: openColorTyped.red[6],
  black: openColorTyped.gray[8],
  white: openColorTyped.white,
  gray: openColorTyped.gray[5],
};

// Is having all themed styles in one file right?
// I think it is. That's because, when we see a lot of duplicates, it indicates
// that we should create a reusable component.

const bold = '600';

const stylesJson = {
  text: {
    color: colors.black,
    // https://css-tricks.com/snippets/css/system-font-stack
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  },

  textWeightNormal: {
    fontWeight: 'normal',
  },

  textWeightBold: {
    fontWeight: bold,
  },

  textPrimary: {
    color: colors.primary,
  },

  textSuccess: {
    color: colors.success,
  },

  textWarning: {
    color: colors.warning,
  },

  textDanger: {
    color: colors.danger,
  },

  textBlack: {
    color: colors.black,
  },

  textWhite: {
    color: colors.white,
  },

  textGray: {
    color: colors.gray,
  },

  heading: {
    fontWeight: bold,
    marginBottom: typography.rhythm(1),
  },

  block: {
    marginBottom: typography.rhythm(1),
    maxWidth: typography.rhythm(28),
  },

  rowSpacer: {
    width: typography.rhythm(0.5),
  },

  pageContainer: {
    paddingHorizontal: typography.rhythm(0.5),
    maxWidth: 960,
  },

  pageBody: {
    paddingTop: typography.rhythm(2),
  },

  pageFooter: {
    borderColor: colors.gray,
    borderTopWidth: 1,
    borderStyle: 'solid',
    marginTop: typography.rhythm(2),
    paddingVertical: typography.rhythm(1),
  },

  mainNav: {
    backgroundColor: colors.primary,
    marginVertical: typography.rhythm(0.5),
    paddingHorizontal: typography.rhythm(0.5),
  },

  mainNavA: {
    paddingHorizontal: typography.rhythm(0.5),
    paddingVertical: typography.rhythm(0.5),
  },

  form: {
    marginBottom: typography.rhythm(1),
    maxWidth: typography.rhythm(21),
  },

  stateDisabled: {
    opacity: 0.5,
  },

  textInput: {
    color: colors.black,
  },

  textInputBig: {
    borderBottomWidth: 1,
    borderColor: colors.gray,
    paddingVertical: typography.rhythm(0.5),
  },

  textInputBigError: {
    minHeight: typography.rhythm(1),
  },

  button: {
    color: colors.black,
    fontWeight: bold,
  },

  buttonSpaced: {
    borderRadius: 2,
    borderWidth: 1,
    paddingVertical: typography.rhythm(0.2),
    paddingHorizontal: typography.rhythm(1),
  },

  buttonPrimary: {
    backgroundColor: colors.primary,
    color: colors.white,
  },

  buttonSuccess: {
    backgroundColor: colors.success,
    color: colors.white,
  },

  buttonWarning: {
    backgroundColor: colors.warning,
    color: colors.white,
  },

  buttonDanger: {
    backgroundColor: colors.danger,
    color: colors.white,
  },

  buttonBlack: {
    backgroundColor: colors.black,
    color: colors.white,
  },

  buttonWhite: {
    backgroundColor: colors.white,
    color: colors.white,
  },

  buttonGray: {
    backgroundColor: colors.gray,
    color: colors.white,
  },

  picker: {
    color: colors.black,
  },

  errorPopup: {
    backgroundColor: colors.danger,
    position: 'absolute',
    zIndex: 1,
    left: 0,
    right: 0,
    top: 0,
    paddingHorizontal: typography.rhythm(1),
    paddingVertical: typography.rhythm(0.5),
  },
};

const styles = StyleSheet.create(stylesJson);

export type Styles = typeof styles;

export const lightTheme: Theme = {
  typography,
  colors,
  textColor: 'black',
  pageBackgroundColor: 'white',
  styles,
};

// Dark theme

export const darkTheme: Theme = {
  ...lightTheme,
  textColor: 'white',
  pageBackgroundColor: 'black',
  styles: StyleSheet.create({
    ...stylesJson,
    text: {
      ...stylesJson.text,
      color: colors.white,
    },

    textInput: {
      ...stylesJson.textInput,
      color: colors.white,
    },

    button: {
      ...stylesJson.button,
      color: colors.white,
    },
  }),
};
