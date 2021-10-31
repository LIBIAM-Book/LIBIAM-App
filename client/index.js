import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import App from "./components/App";

import Home from "./components/Home";
import Form from "./components/Form";
import PageNotFound from "./components/PageNotFound";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/form' component={Form} />
      <Route component={PageNotFound} />
    </Switch>
  </BrowserRouter>,
  document.getElementById("app")
);
