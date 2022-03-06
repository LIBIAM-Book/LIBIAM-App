import React, { useState, useContext } from 'react';
//prevent 'regeneratorRuntime is not defined' error (occurs when using async with webpack)
import 'regenerator-runtime/runtime';
import axios from 'axios';

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
import ErrorMessage from '../components/ErrorMessage';

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

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

  //⬇⬇⬇ FOR DEV CHECK PURPOSE.
  // console.log(formState);

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          firstName: undefined,
          lastName: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          firstName: {
            value: '',
            isValid: false,
          },
          lastName: {
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
    console.log(formState.inputs);

    // for logging in -----------
    if (isLoginMode) {
      try {
        // created HttpRequest Hook to be used whenever fetching data from database.
        const responseData = await sendRequest(
          '/api/users/auth',
          'POST',
          {
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          },
          {
            'Content-Type': 'application/json',
          }
        );
        console.log(responseData);
      } catch (err) {}
    }
    // for signing up -----------
    else {
      try {
        axios
          .post('/api/users', {
            first_name: formState.inputs.firstName.value,
            last_name: formState.inputs.lastName.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <React.Fragment>
      <div className='center-item'>
        <Card className='auth__form_container'>
          {isLoading && <LoadingSpinner asOverlay />}

          <h2>Sign in to your Libiam account</h2>
          {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}

          <form onSubmit={authSubmitHandler}>
            {!isLoginMode && (
              <div className='auth__form_short_input_wrapper'>
                <Input
                  styles='auth__form_short_input'
                  element='input'
                  id='firstName'
                  inputGroup='firstName'
                  type='text'
                  placeholder='First Name'
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText='Please enter your first name.'
                  onInput={inputHandler}
                />
                {/* {!isLoginMode && ( */}
                <Input
                  styles='auth__form_short_input'
                  element='input'
                  id='lastName'
                  inputGroup='lastName'
                  type='text'
                  placeholder='Last Name'
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText='Please enter your last name.'
                  onInput={inputHandler}
                />
              </div>
            )}
            <Input
              styles='auth__form_long_input'
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
              styles='auth__form_long_input'
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
