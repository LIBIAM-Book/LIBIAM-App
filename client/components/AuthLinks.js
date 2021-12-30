import React, { useContext } from 'react';
import { CgProfile } from 'react-icons/cg';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AuthLinks = () => {
  const auth = useContext(AuthContext);

  return (
    <React.Fragment>
      {auth.isLoggedIn && (
        <NavLink to='/profile'>
          <CgProfile />
        </NavLink>
      )}
      {!auth.isLoggedIn && <NavLink to='/auth'>Log In</NavLink>}
    </React.Fragment>
  );
};

export default AuthLinks;
