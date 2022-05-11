import React, { createContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

export const AuthContext = createContext({
  isLoggedIn: false,
  cred: {},
  setCred: () => {},
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [cred, setCred] = useState({ });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (Object.keys(cred).length === 0) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  }, [cred]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, cred, setCred }}>
      {children}
      {isLoggedIn ? <Redirect to='/profile' /> : <Redirect to='/auth' />}
    </AuthContext.Provider>
  );
};
