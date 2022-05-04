import React, { useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import Layout from './Layout/index';
import { BookProvider } from './context/BookContext';
import { AuthContext } from './context/AuthContext';

import Home from './pages/Home';
import PersonalizedBook from './pages/PersonalizedBook';
import FormPage from './pages/FormPage';
import Auth from './pages/Auth';
import Profile from './pages/Profile';

const App = () => {
  const [childName, setChildName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // NEED UPDATE:: data is placeholder for now. Use actual token or user id data once user db is complete.
  const loginHandler = (data) => {
    setIsLoggedIn(data);
  };
  const logoutHandler = () => {
    setIsLoggedIn(false);
  };

  let routes;

  if (isLoggedIn) {
    routes = (
      // If LoggedIn Data exist, page redirect is Profile page.
      // Else, page redirect is login page.
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/form'>
          <FormPage setChildName={setChildName} />
        </Route>
        <Route exact path='/personalized-book'>
          <PersonalizedBook childName={childName} />
        </Route>
        <Route exact path='/profile'>
          <Profile />
        </Route>
        <Redirect to='/profile' />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        {/* <Route exact path='/form'>
          <FormPage setChildName={setChildName} />
        </Route>
        <Route exact path='/personalized-book'>
          <PersonalizedBook childName={childName} />
        </Route> */}
        <Route exact path='/auth'>
          <Auth />
        </Route>
        <Redirect to='/auth' />
      </Switch>
    );
  }

  return (
    <BrowserRouter>
      <AuthContext.Provider
        value={{
          isLoggedIn: isLoggedIn,
          login: loginHandler,
          logout: logoutHandler,
        }}
      >
        <BookProvider>
          <Layout>{routes}</Layout>
        </BookProvider>
      </AuthContext.Provider>
    </BrowserRouter>
  );
};

export default App;
