import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { LandingPage } from './pages';
import { RoutePaths } from './routes';

export const AppRoutes: React.FC<{}> = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={RoutePaths.Default} component={LandingPage} />
      </Switch>
    </BrowserRouter>
  );
};
