/** @format */

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Technologies from './Technologies';

const routes = () => {
  <Router>
    <Switch>
      <Route path='/technologies' component={Technologies} />
      <Route path='/' component={Home} />
    </Switch>
  </Router>;
};

export default routes;
