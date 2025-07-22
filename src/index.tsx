import React from 'react';
import ReactDOM from 'react-dom';
import smoothscroll from 'smoothscroll-polyfill';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import HomePage from './layout/containers/HomePage';
import MajorPage from './layout/containers/MajorPage';
import ErrorPage from './layout/containers/ErrorPage';

import './index.scss';

smoothscroll.polyfill();

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/units" component={MajorPage} />
      <Route path="/" component={ErrorPage} />
    </Switch>
  </Router>,
  document.getElementById('root'),
);
