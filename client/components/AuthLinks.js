import React from 'react';
import { CgProfile } from 'react-icons/cg';

const AuthLinks = () => {
  return (
    <div>
      {/* Need to use NavLinks and login condition to switch back and forth of login
      & profile */}
      <CgProfile />
    </div>
  );
};

export default AuthLinks;
