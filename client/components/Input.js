import React, { useEffect, useReducer } from 'react';

import { validate } from '../util/validators';

const inputReducer = (state, action) => {
  switch (action.type) {
    case 'TEXT':
      return {
        ...state,
        value: action.inputValue,
        isValid: validate(action.inputValue, action.validators),
      };
    case 'TOUCHED':
      return {
        ...state,
        isTouched: true,
      };
    case 'RADIO':
      return {
        ...state,
        value: action.inputGroupName,
        isValid: true,
      };

    default:
      return state;
  }
};

//export start

const Input = (props) => {
  let {
    initialIsValid,
    initialValue,
    id,
    onInput,
    validators,
    type,
    placeholder,
    rows,
    styles,
    label,
    errorText,
    radioBoxStyles,
    inputGroup,
  } = props;

  // individual input state & validity control
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: initialValue || '',
    isTouched: false,
    isValid: initialIsValid || false,
  });

  // data push for entire form validity
  const { value, isValid } = inputState;
  useEffect(() => {
    onInput(inputGroup, value, isValid);
  }, [inputGroup, id, value, isValid, onInput]);

  const inputChangeHandler = (event) => {
    dispatch({
      type: 'TEXT',
      inputValue: event.target.value,
      validators: validators,
    });
    // ⬇⬇⬇ FOR DEV CHECK PURPOSE. Feel free to delete
    // console.log(event.target.id, isValid);
  };

  const radioChangeHandler = (event) => {
    dispatch({
      type: 'RADIO',
      inputGroupName: event.target.name,
    });
    // ⬇⬇⬇ FOR DEV CHECK PURPOSE. Feel free to delete
    // console.log(event.target.name, isValid, event.target.value);
  };

  const touchHandler = () => {
    dispatch({
      type: 'TOUCHED',
    });
  };

  const element =
    props.element === 'input' ? (
      // for text inputs
      <input
        name={inputGroup}
        id={id}
        type={type}
        placeholder={placeholder}
        value={inputState.value}
        onChange={inputChangeHandler}
        onBlur={touchHandler}
        autoComplete='off'
        className={`${styles} 
        bg-yellow-200 focus:outline-none rounded-full     
        p-5 text-black text-center`}
      />
    ) : props.element === 'radio' ? (
      // for radio buttons
      <input
        id={id}
        name={inputGroup}
        type={type}
        value={props.value}
        onChange={radioChangeHandler}
        className={`${styles} appearance-none`}
      />
    ) : props.element === 'textarea' ? (
      // for personalization keywords
      <textarea
        id={id}
        name={inputGroup}
        rows={rows || 3}
        placeholder={placeholder}
        onChange={inputChangeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    ) : (
      // other input types need to be addressed otherwise
      <input />
    );

  return (
    <>
      <div className='flex flex-col'>
        <label htmlFor={id}>
          {element}
          <div className={`${radioBoxStyles}`}>{label}</div>
        </label>

        {inputState.isTouched && !inputState.isValid && (
          <p className='text-sm tracking-wide text-blue-500 mt-2'>
            {errorText}
          </p>
        )}
      </div>
    </>
  );
};

export default Input;
