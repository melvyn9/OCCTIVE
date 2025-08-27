import React from 'react';
import ReactDOM from 'react-dom';
import smoothscroll from 'smoothscroll-polyfill';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import HomePage from './layout/containers/HomePage';
import UnitPage from './layout/containers/UnitPage';
import ErrorPage from './layout/containers/ErrorPage';
import AdoptPage from './layout/containers/AdoptPage';
import AboutPage from './layout/containers/AboutPage';
import WorkshopPage from './layout/containers/WorkshopPage';

import './index.scss';

smoothscroll.polyfill();

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/library" component={UnitPage} />
      <Route exact path="/adopt" component={AdoptPage} />
      <Route exact path="/about" component={AboutPage} />
      <Route exact path="/workshop" component={WorkshopPage} />
      <Route path="/" component={ErrorPage} />
    </Switch>
  </Router>,
  document.getElementById('root'),
);
