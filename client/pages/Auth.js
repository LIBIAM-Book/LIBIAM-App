import React, { useState, useContext } from 'react';
import axios from 'axios';
//prevent 'regeneratorRuntime is not defined' error (occurs when using async with webpack)
import 'regenerator-runtime/runtime';

import './Auth.css';

import { useForm } from '../hooks/form-hooks';
import { AuthContext } from '../context/AuthContext';
import { useHttpClient } from '../hooks/http-hook';

import Input from '../components/Input';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../util/validators';
import Button from '../components/Button';
import Card from '../components/Card';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorModal from '../components/ErrorModal';

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  // const { isLoading, error, sendRequest, clearError } = useHttpClient();

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
    // console.log(formState.inputs);

    // for logging in -----------
    // try {
    //   // created HttpRequest Hook to be used whenever fetching data from database.
    //   const responseData = await sendRequest('/api/users');
    //   console.log(responseData);
    // } catch (err) {}

    try {
      const { data } = await axios.get('/api/users');
      console.log(data);
    } catch (err) {}
  };

  return (
    <React.Fragment>
      {/* <ErrorModal error={error} onClear={clearError} variant='danger' /> */}
      <div className='center-item'>
        <Card className='auth__form_container'>
          {/* {isLoading && <LoadingSpinner asOverlay />} */}

          <h2>Sign in to your Libiam account</h2>

          <form onSubmit={authSubmitHandler}>
            {!isLoginMode && (
              <Input
                auth
                element='input'
                id='name'
                inputGroup='name'
                type='text'
                placeholder='Your Name'
                validators={[VALIDATOR_REQUIRE()]}
                errorText='Please enter a name.'
                onInput={inputHandler}
              />
            )}

            <Input
              auth
              element='input'
              id='email'
              inputGroup='email'
              type='email'
              placeholder='Email'
              validators={[VALIDATOR_EMAIL()]}
              errorText='Please enter a valid email address.'
              onInput={inputHandler}
            />
            <Input
              auth
              element='input'
              id='password'
              inputGroup='password'
              type='password'
              placeholder='Password'
              validators={[VALIDATOR_MINLENGTH(3)]}
              errorText='Please enter a valid password, at least 5 characters.'
              onInput={inputHandler}
            />

            <div className='button_container'>
              <Button auth type='submit' disabled={!formState.formIsValid}>
                {isLoginMode ? 'Login' : 'Create my account'}
              </Button>
            </div>
          </form>
          <Button auth onClick={switchModeHandler}>
            {isLoginMode ? 'Sign Up' : 'Back to login'}
          </Button>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default Auth;
