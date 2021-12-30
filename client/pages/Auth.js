import React, { useState, useContext } from 'react';

import './Auth.css';

import { useForm } from '../hooks/form-hooks';
import { AuthContext } from '../context/AuthContext';

import Input from '../components/Input';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../util/validators';
import Button from '../components/Button';

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);

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

  const authSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
    auth.login();
  };

  return (
    <React.Fragment>
      <div>
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
            label='E-Mail'
            validators={[VALIDATOR_EMAIL()]}
            errorText='Please enter a valid email address.'
            onInput={inputHandler}
          />
          <Input
            element='input'
            id='password'
            inputGroup='password'
            type='password'
            label='Password'
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText='Please enter a valid password, at least 5 characters.'
            onInput={inputHandler}
          />

          <Button auth type='submit' disabled={!formState.formIsValid}>
            {isLoginMode ? 'LOGIN' : 'SIGNUP'}
          </Button>
        </form>
        <Button auth onClick={switchModeHandler}>
          Switch to {isLoginMode ? 'SIGNUP' : 'LOGIN'}
        </Button>
      </div>
    </React.Fragment>
  );
};

export default Auth;
