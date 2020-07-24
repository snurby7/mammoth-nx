import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming';
import React from 'react';

const theme = {
  backgroundColor: 'green',
  color: 'red',
};

export const ThemeProvider: React.FC = ({ children }): JSX.Element => {
  return <EmotionThemeProvider theme={theme}>{children}</EmotionThemeProvider>;
};
