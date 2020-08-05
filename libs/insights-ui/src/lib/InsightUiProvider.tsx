import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import green from '@material-ui/core/colors/green';
import purple from '@material-ui/core/colors/purple';
import 'fontsource-roboto';
import React from 'react';
import './InsightUiProvider.scss';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
    },
  },
});

export const InsightUiProvider: React.FC = ({ children }): JSX.Element => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
