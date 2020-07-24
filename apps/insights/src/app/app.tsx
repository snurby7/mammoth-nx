import React from 'react';
import { AppRoutes } from './app.routes';
import { ThemeProvider } from './providers';

export const App = () => {
  return (
    <div>
      <main>
        <ThemeProvider>
          <AppRoutes />
        </ThemeProvider>
      </main>
    </div>
  );
};
