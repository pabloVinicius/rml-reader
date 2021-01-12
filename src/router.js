import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';

const router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/sobre" exact component={About} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default router;
