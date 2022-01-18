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
import Card from '../components/Card';

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
      <div className='center-item'>
        <Card className='auth__form_container'>
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
              validators={[VALIDATOR_MINLENGTH(5)]}
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
