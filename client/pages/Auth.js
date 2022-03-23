import React, { useState, useContext, useEffect } from 'react';
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
  const signUpMsgWrapperStyle = 'w-full h-full l-0 t-0 mt-4 text-md';
  
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [showSignUpMsg, setShowSignUpMsg] = useState(false);
  const [signUpMsg, setSignUpMsg] = useState(signUpSuccessMsg);
  const [disableSubmission, setDisableSubmission] = useState(false);
  const [signUpMsgWrapperCSS, setSignUpMsgWrapperCSS] = useState('hidden');
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const signUpSuccessMsg = (
    <>
      <p className="text-green">
        Sign up
        <strong style={{ color: 'green' }}> Successful!</strong>
      </p>
      <p>Please log in with the registered credentials.</p>
    </>
  );
  const signUpFailedMsg = (msg) => (
    <>
      <p className="text-red">
        Sign up
        <strong style={{ color: 'red' }}>
          {' '}Failed{' '}
        </strong>
      </p>
      <p>
        Due to:
        {' '}
        {msg} &#58;&#40;
      </p>
      <br />
      <p>Please try again!</p>
    </>
  );

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
  // console.log(formState.formIsValid);

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
      setShowSignUpMsg(false);
      setSignUpMsg(''); // DO I NEED THIS?
      setDisableSubmission(false);
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
            setShowSignUpMsg(true);
            setSignUpMsg(signUpSuccessMsg);
            setDisableSubmission(true)
          })
          .catch((err) => {
            console.log('error message', err.response);
            console.log('error status', err.status)
            setShowSignUpMsg(true);
            let errMsg = '';
            if (err.response.status === 409) {
              errMsg = "User already exists.";
            } else {
              errMsg = "Unknown error occured.";
            }
            setSignUpMsg(signUpFailedMsg(errMsg));
          });
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    if (showSignUpMsg) {
      setSignUpMsgWrapperCSS(signUpMsgWrapperStyle);
    } else {
      setSignUpMsgWrapperCSS('hidden');
    }
  }, [showSignUpMsg])

  return (
    <React.Fragment>
      <div className='center-item'>
        <Card className='auth__form_container'>
          {isLoading && <LoadingSpinner asOverlay />}

          <h2>Sign in to your Libiam account</h2>
          {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}

          <form onSubmit={authSubmitHandler} className="relative">
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
            <div className={signUpMsgWrapperCSS}>
              {signUpMsg}
            </div>
            <div className='button_container'>
              <Button auth type='submit' disabled={!formState.formIsValid || disableSubmission}>
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
