import React, { useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import Layout from './Layout/index';
import { BookProvider } from './context/BookContext';
import { AuthProvider } from './context/AuthContext';

import Home from './pages/Home';
import PersonalizedBook from './pages/PersonalizedBook';
import FormPage from './pages/FormPage';
import Auth from './pages/Auth';
import Profile from './pages/Profile';

const App = () => {
  const [childName, setChildName] = useState('');

  return (
    <BrowserRouter>
      <AuthProvider>
        <BookProvider>
          <Layout>
            <Switch>
              <Route exact path='/'>
                <Home />
              </Route>
              {/* below can be deleted when Book Data DB feature complete */}
              <Route exact path='/form'>
                <FormPage setChildName={setChildName} />
              </Route>
              <Route exact path='/personalized-book'>
                <PersonalizedBook childName={childName} />
              </Route>
              {/* ------ */}
              <Route exact path='/auth'>
                <Auth />
              </Route>
              <Route exact path='/profile'>
                <Profile />
              </Route>
            </Switch>
          </Layout>
        </BookProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
