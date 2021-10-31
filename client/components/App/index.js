import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from '../Home';
import Form from '../Form';
import PageNotFound from '../PageNotFound';

const App = (props) => (
  <BrowserRouter>
    <div>
      <Route exact path="/" Component={Home} />
      <Route path="/form" Component={Form} />
      <Route Component={PageNotFound} />
    </div>
  </BrowserRouter>
);

export default App;