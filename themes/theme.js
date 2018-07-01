// @flow
import type { Theme, OpenColor } from './types';
import createTypography from './createTypography';
import openColor from 'open-color';
import { StyleSheet } from 'react-native';
import colorLib from 'color';

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
  // TODO: Rename to foreground and background to remove all colors[white / black]?
  black: openColorTyped.gray[8],
  white: openColorTyped.white,
  gray: openColorTyped.gray[5],
};

// Is having all themed styles in one file right?
// I think it is. That's because, when we see a lot of duplicates, it indicates
// that we should create a reusable component.

// https://css-tricks.com/snippets/css/system-font-stack
const fontFamily =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';

const bold = '600';

const stylesJson = {
  text: {
    color: colors.black,
    fontFamily,
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
    fontFamily,
    marginBottom: typography.rhythm(1),
    color: colors.gray,
  },

  block: {
    marginBottom: typography.rhythm(1),
    maxWidth: typography.rhythm(28),
  },

  rowSpacer: {
    width: typography.rhythm(0.5),
  },

  appPageContainer: {
    paddingHorizontal: typography.rhythm(0.5),
    maxWidth: 768,
  },

  appPageFooter: {
    borderColor: colors.gray,
    borderTopWidth: 1,
    borderStyle: 'solid',
    paddingVertical: typography.rhythm(0.5),
  },

  appPageMainNav: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: typography.rhythm(2),
  },

  stateDisabled: {
    opacity: 0.5,
  },

  textInput: {
    color: colors.black,
    fontFamily,
  },

  textInputError: {
    minHeight: typography.rhythm(1),
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

  post: {
    flex: 1,
  },

  postMarkdown: {
    paddingVertical: typography.rhythm(0.5),
  },

  postMarkdownTextInput: {
    color: colors.black,
    fontFamily,
    // It's the initial height. Client overrides it via inline styles.
    height: typography.rhythm(1),
  },

  postMarkdownButtons: {
    minHeight: typography.rhythm(1),
    paddingVertical: typography.rhythm(1),
  },
};

const styles = StyleSheet.create(stylesJson);

export type Styles = typeof styles;

const placeholderTextColor = color =>
  colorLib(color)
    .fade(0.5)
    .toString();

export const lightTheme: Theme = {
  typography,
  colors,
  placeholderTextColor: placeholderTextColor(colors.black),
  pageBackgroundColor: 'white',
  styles,
};

// Dark theme

export const darkTheme: Theme = {
  ...lightTheme,
  placeholderTextColor: placeholderTextColor(colors.white),
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

    postMarkdownTextInput: {
      ...stylesJson.postMarkdownTextInput,
      color: colors.white,
    },
  }),
};
