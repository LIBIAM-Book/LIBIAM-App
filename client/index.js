import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Layout from './components/Layout'

import Home from './components/Home';
import Form from './components/Form';
import PersonalizedBook from './components/PersonalizedBook';
import PageNotFound from './components/PageNotFound';

ReactDOM.render(
  <BrowserRouter>
    <Layout>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/form" component={Form} />
        <Route exact path="/personalized-book" component={PersonalizedBook} />
        <Route component={PageNotFound} />
      </Switch>
    </Layout>
  </BrowserRouter>, 
  document.getElementById('app'));