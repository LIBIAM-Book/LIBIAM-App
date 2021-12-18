import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import { BrowserRouter, Switch } from 'react-router-dom';
import Layout from './Layout';

ReactDOM.render(
  <React.Fragment>
    <BrowserRouter>
      <Layout>
        <Switch>
          <App />
        </Switch>
      </Layout>
    </BrowserRouter>
    ,
  </React.Fragment>,
  document.getElementById('app')
);
