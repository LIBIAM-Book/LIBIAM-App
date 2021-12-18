import React, { useContext, useState } from 'react';

import './Auth.css';

import { useForm } from '../hooks/form-hooks';
import { useHttpClient } from '../hooks/http-hook';
import { AuthContext } from '../context/AuthContext';

import Input from '../components/Input';
import Button from '../components/Button';
import ErrorModal from '../components/ErrorModal';
import LoadingSpinner from '../components/LoadingSpinner';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../util/validators';

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, error, clearError } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          // name input does not exist in login mode.
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: '',
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    // after login or signup, page redirected to... "root" because
    // '/auth' doesn't exist in routes in 'App.js' once logged in.

    // IF LOGGING IN -------------

    if (isLoginMode) {
      try {
        // Use HttpRequest Hook whenever fetching data from database.
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + '/???' ||
            'http://localhost:5000/api/login',
          'POST',
          // Data that we will send to backend.
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            'Content-Type': 'application/json',
          }
        );
        auth.login(responseData.user.id);
      } catch (err) {}
    }

    // IF SIGNING UP -------------
    else {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + '/???' ||
            'http://localhost:5000/api/signup',
          'POST',
          JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            'Content-Type': 'application/json',
          }
        );

        auth.login(responseData.user.id);
      } catch (err) {}
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <div className='center-item '>
        <div>
          {isLoading && <LoadingSpinner asOverlay />}
          <h2>Login Required</h2>
          <hr />
          <form onSubmit={authSubmitHandler}>
            {!isLoginMode && (
              <Input
                element='input'
                id='name'
                inputGroup='name'
                type='text'
                label='Your Name'
                placeholder='Write your name here...'
                validators={[VALIDATOR_REQUIRE()]}
                errorText='Please enter a name.'
                onInput={inputHandler}
              />
            )}
            <Input
              element='input'
              id='email'
              inputGroup='email'
              type='email'
              label='E-mail'
              placeholder='Enter your e-mail here...'
              validators={[VALIDATOR_EMAIL()]}
              errorText='Please enter a valid email.'
              onInput={inputHandler}
            />
            <Input
              element='input'
              id='password'
              inputGroup='password'
              type='password'
              label='Password'
              placeholder='Enter password here...'
              validators={[VALIDATOR_MINLENGTH(6)]}
              errorText='Please enter a valid password, at least 5 characters.'
              onInput={inputHandler}
            />
            <button type='submit'>{isLoginMode ? 'Login' : 'Sign up'}</button>
          </form>
          <Button onClick={switchModeHandler}>
            Switch to {isLoginMode ? 'Sign up' : 'Login'}
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Auth;
