import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const auth = useContext(AuthContext);

  return (
    <React.Fragment>
      <h1>This is Profile Page</h1>
      {auth.isLoggedIn && (
        <li>
          <button onClick={auth.logout}>LOGOUT</button>
        </li>
      )}
    </React.Fragment>
  );
};

export default Profile;
