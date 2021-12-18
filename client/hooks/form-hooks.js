import { useReducer, useCallback } from 'react';

const formReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT_CHANGE':
      let formIsValid = true;
      for (const i in state.inputs) {
        if (!state.inputs[i]) {
          continue;
        }
        if (i === action.inputGroup) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[i].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputGroup]: { value: action.value, isValid: action.isValid },
        },
        formIsValid: formIsValid,
      };

    case 'WHATS_THE_NAME':
      return {
        inputs: action.inputs,
      };

    default:
      return state;
  }
};

// export start

export const useForm = (initialInputs, initialFormValidity) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    formIsValid: initialFormValidity,
  });

  //run form validity
  const inputHandler = useCallback((inputGroup, value, isValid) => {
    dispatch({
      type: 'INPUT_CHANGE',
      value: value,
      isValid: isValid,
      inputGroup: inputGroup,
    });
  }, []);

  //pass on the name input to chose which story to show FOR DEMO
  const namePulledOutFromFormState = useCallback((nameInput) => {
    dispatch({
      type: 'WHATS_THE_NAME',
      inputs: nameInput,
    });
  }, []);

  return [formState, inputHandler, namePulledOutFromFormState];
};
