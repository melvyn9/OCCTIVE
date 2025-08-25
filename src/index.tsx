import React from 'react';
import ReactDOM from 'react-dom';
import smoothscroll from 'smoothscroll-polyfill';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import HomePage from './layout/containers/HomePage';
import UnitPage from './layout/containers/UnitPage';
import ErrorPage from './layout/containers/ErrorPage';
import ResourcePage from './layout/containers/ResourcePage';
import AboutPage from './layout/containers/AboutPage';

import './index.scss';

smoothscroll.polyfill();

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/units" component={UnitPage} />
      <Route exact path="/resources" component={ResourcePage} />
      <Route exact path="/about" component={AboutPage} />
      <Route path="/" component={ErrorPage} />
    </Switch>
  </Router>,
  document.getElementById('root'),
);
