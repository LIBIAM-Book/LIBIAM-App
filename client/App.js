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
  const [userId, setUserId] = useState(false);

  const login = (uid) => {
    setIsLoggedIn(true);
    setUserId(uid);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserId(null);
  };

  let routes;

  if (isLoggedIn) {
    routes = (
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
        <Redirect to='/' />
      </Switch>
    );
  } else {
    routes = (
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
          userId: userId,
          login: login,
          logout: logout,
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
