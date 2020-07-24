import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

export const AppRoutes: React.FC<{}> = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={() => <div>welcome home</div>} />
      </Switch>
    </BrowserRouter>
  );
};
