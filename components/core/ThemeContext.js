// @flow
import * as React from 'react';
import { lightTheme } from '../../themes/theme';
import type { Theme } from '../../themes/types';

const ThemeContext = React.createContext((lightTheme: Theme));

export default ThemeContext;
