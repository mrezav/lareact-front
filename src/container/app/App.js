import React, { Fragment } from 'react';
import logo from '../../logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

import Dashboard from '../dashboard/Dahsboard';
import Login from '../login/Login.jsx';
import Register from '../register/Register.jsx';

import '../styles/style.scss';

function App() {
  return (
    <Fragment>
      <Router>
          <Switch>
            <Route path="/" exact>
              <Dashboard />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
          </Switch>
      </Router>
    </Fragment>
  );
}

export default App;