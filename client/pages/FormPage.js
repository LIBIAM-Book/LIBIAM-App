import React, { useState, useContext } from 'react';
import axios from 'axios';

import { BookContext } from '../context/BookContext';
import Input from '../components/Input';
import { useForm } from '../hooks/form-hooks';
import { VALIDATOR_REQUIRE } from '../util/validators';
import Button from '../components/Button';

import './FormPage.css';

import demoOlivia from '../mockData/olivia.json';
import demoJessica from '../mockData/jessica.json';

const dataLoader = (data) => {
  const formattedData = {
    cover: data[0],
    firstPage: data[1],
    secondPage: data[2],
    thirdPage: data[3],
    end: data[4],
  };

  return formattedData;
};

const FormPage = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { setChildName } = props;

  const { bookContentDispatch } = useContext(BookContext);

  const isOpenHandler = () => {
    setChildName(formState.inputs.name.value);
    let payload;
    if (formState.inputs.name.value.toLowerCase() === 'olivia') {
      payload = dataLoader(demoOlivia.Data);
    } else if (formState.inputs.name.value.toLowerCase() === 'jessica') {
      payload = dataLoader(demoJessica.Data);
    } else {
      payload = dataLoader(demoOlivia.Data);
    }
    bookContentDispatch({ type: 'LOAD_ALL', payload });

    setIsOpen(true);
  };

  const [formState, inputHandler] = useForm(
    {
      name: {
        value: '',
        isValid: false,
      },
      gender: {
        value: 0,
        isValid: false,
      },
      favThings: {
        value: '',
        isValid: false,
      },
      favPlaces: {
        value: '',
        isValid: false,
      },
      favColors: {
        value: '',
        isValid: false,
      },
      favSeason: {
        value: 0,
        isValid: false,
      },
      favTime: {
        value: 0,
        isValid: false,
      },
    },
    false
  );

  const formSubmitHandler = (event) => {
    event.preventDefault();

    console.log(formState);

    const {
      name,
      gender,
      favThings,
      favPlaces,
      favColors,
      favSeason,
      favTime,
    } = formState.inputs;

    const surveyData = {
      firstName: name.value,
      gender: Number.parseInt(gender.value),
      favThings: favThings.value,
      favPlaces: favPlaces.value,
      favColors: favColors.value,
      favSeason: Number.parseInt(favSeason.value),
      favTime: Number.parseInt(favTime.value),
    }

    axios.post('/api/books', {
      ...surveyData,
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.error(err)
    })
  };

  // Pulls out only the "Name" value of the inputs.
  // Triggers when pressing on SUBMIT button.
  const showNameHandler = () => {
    console.log(formState.inputs.name.value);
  };

  return (
    <React.Fragment>
      <form
        className='
        flex items-center flex-col
        pb-20'
        onSubmit={formSubmitHandler}
      >
        {/* Page 1-1 */}
        <div id='page1-1'>
          <h1
            className='
            text-blue-500 font-barriecito text-4xl
            mt-56'
          >
            Who is this book for?
          </h1>
          <Input
            id='name'
            inputGroup='name'
            element='input'
            type='text'
            placeholder='Full Name'
            validators={[VALIDATOR_REQUIRE()]}
            errorText='Please enter a name!'
            onInput={inputHandler}
            styles='form_input w-72 transition ease-in-out hover:outline-yellow focus:outline-yellow hover:shadow-inner focus:shadow-inner'
          />
          <div className='mt-2 w-72 flex justify-between form_radio_wrapper'>
            <div className='w-32'>
              <Input
                id='boy'
                inputGroup='gender'
                element='radio'
                type='radio'
                value='Boy'
                label='Boy'
                onInput={inputHandler}
                radioBoxStyles='p-5 rounded-full block w-full
              transition ease-in-out 
              outline-0
              hover:outline-yellow hover:shadow-inner
              label-checked:bg-yellow-400 label-checked:shadow-inner  
              label-checked:text-white
              transform active:scale-95'
              />
            </div>
            <div className='w-32'>
              <Input
                id='girl'
                inputGroup='gender'
                element='radio'
                type='radio'
                value='Girl'
                label='Girl'
                onInput={inputHandler}
                radioBoxStyles='
              p-5 rounded-full block w-full
              transition ease-in-out 
              outline-0
              bg-yellow-200
              hover:outline-yellow hover:shadow-inner
              label-checked:bg-yellow-400 label-checked:shadow-inner  
              label-checked:text-white
              transform active:scale-95'
              />
            </div>
          </div>

          {!isOpen && (
            <Button
              onClick={isOpenHandler}
              styles='mt-24 p-4 w-72 shadow-lg
            transition ease-in-out 
            outline-blue
            bg-white text-blue-500 
            hover:bg-blue-500 hover:text-white
            active:bg-blue-600
            transform active:scale-95'
            >
              Tell us more about you!
            </Button>
          )}
        </div>
        {isOpen && (
          <React.Fragment>
            {/* page favorite-Things */}
            <div id='page1-2' className='mt-20'>
              <h1
                className='text-blue-500 font-barriecito 
              text-3xl tracking-wide mt-10'
              >
                Favorite Things
              </h1>
              <p
                className='mt-2 mb-4 text-gray-400 
              font-light text-sm'
              >
                Please enter your 5 favorite things!
              </p>

              <div className='flex flex-row'>
                <Input
                  id='favThings-1'
                  inputGroup='favThings'
                  element='input'
                  type='text'
                  placeholder='1st word'
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText='Please enter at least one word!'
                  onInput={inputHandler}
                  styles='mt-5 w-28 mx-3
                  transition ease-in-out hover:outline-yellow focus:outline-yellow hover:shadow-inner focus:shadow-inner'
                />
                <Input
                  id='favThings-2'
                  inputGroup='favThings'
                  element='input'
                  type='text'
                  placeholder='2nd word'
                  validators={[VALIDATOR_REQUIRE()]}
                  onInput={inputHandler}
                  styles='mt-5 w-28 mx-3
                  transition ease-in-out hover:outline-yellow focus:outline-yellow hover:shadow-inner focus:shadow-inner'
                />
                <Input
                  id='favThings-3'
                  inputGroup='favThings'
                  element='input'
                  type='text'
                  placeholder='3rd word'
                  validators={[VALIDATOR_REQUIRE()]}
                  onInput={inputHandler}
                  styles='mt-5 w-28 mx-3
                  transition ease-in-out hover:outline-yellow focus:outline-yellow hover:shadow-inner focus:shadow-inner'
                />
                <Input
                  id='favThings-4'
                  inputGroup='favThings'
                  element='input'
                  type='text'
                  placeholder='4th word'
                  validators={[VALIDATOR_REQUIRE()]}
                  onInput={inputHandler}
                  styles='mt-5 w-28 mx-3
                  transition ease-in-out hover:outline-yellow focus:outline-yellow hover:shadow-inner focus:shadow-inner'
                />
                <Input
                  id='favThings-5'
                  inputGroup='favThings'
                  element='input'
                  type='text'
                  placeholder='5th word'
                  validators={[VALIDATOR_REQUIRE()]}
                  onInput={inputHandler}
                  styles='mt-5 w-28 mx-3
                  transition ease-in-out hover:outline-yellow focus:outline-yellow hover:shadow-inner focus:shadow-inner'
                />
              </div>
            </div>

            {/* page favorite-places */}
            <div id='page1-3' className='mt-16'>
              <h1
                className='text-blue-500 font-barriecito 
              text-3xl tracking-wide mt-5'
              >
                Favorite Places
              </h1>
              <p className='mt-2 mb-4 text-gray-400 font-light text-sm'>
                Please enter your 5 favorite places!
              </p>

              <div className='flex flex-row'>
                <Input
                  id='favPlaces-1'
                  inputGroup='favPlaces'
                  element='input'
                  type='text'
                  placeholder='1st word'
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText='Please enter at least one word!'
                  onInput={inputHandler}
                  styles='mt-5 w-28 mx-3
                  transition ease-in-out hover:outline-yellow focus:outline-yellow hover:shadow-inner focus:shadow-inner'
                />
                <Input
                  id='favPlaces-2'
                  inputGroup='favPlaces'
                  element='input'
                  type='text'
                  placeholder='2nd word'
                  validators={[VALIDATOR_REQUIRE()]}
                  onInput={inputHandler}
                  styles='mt-5 w-28 mx-3
                  transition ease-in-out hover:outline-yellow focus:outline-yellow hover:shadow-inner focus:shadow-inner'
                />
                <Input
                  id='favPlaces-3'
                  inputGroup='favPlaces'
                  element='input'
                  type='text'
                  placeholder='3rd word'
                  validators={[VALIDATOR_REQUIRE()]}
                  onInput={inputHandler}
                  styles='mt-5 w-28 mx-3
                  transition ease-in-out hover:outline-yellow focus:outline-yellow hover:shadow-inner focus:shadow-inner'
                />
                <Input
                  id='favPlaces-4'
                  inputGroup='favPlaces'
                  element='input'
                  type='text'
                  placeholder='4th word'
                  validators={[VALIDATOR_REQUIRE()]}
                  onInput={inputHandler}
                  styles='mt-5 w-28 mx-3
                  transition ease-in-out hover:outline-yellow focus:outline-yellow hover:shadow-inner focus:shadow-inner'
                />
                <Input
                  id='favPlaces-5'
                  inputGroup='favPlaces'
                  element='input'
                  type='text'
                  placeholder='5th word'
                  validators={[VALIDATOR_REQUIRE()]}
                  onInput={inputHandler}
                  styles='mt-5 w-28 mx-3
                  transition ease-in-out hover:outline-yellow focus:outline-yellow hover:shadow-inner focus:shadow-inner'
                />
              </div>
            </div>

            {/* page favorite-colors */}
            <div id='page1-4' className='mt-16'>
              <h1
                className='text-blue-500 font-barriecito 
              text-3xl tracking-wide mt-5'
              >
                Favorite Colors
              </h1>
              <p className='mt-2 mb-4 text-gray-400 font-light text-sm'>
                Please enter your 5 favorite colors!
              </p>

              <div className='flex flex-row'>
                <Input
                  id='favColors-1'
                  inputGroup='favColors'
                  element='input'
                  type='text'
                  placeholder='1st word'
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText='Please enter at least one word!'
                  onInput={inputHandler}
                  styles='mt-5 w-28 mx-3
                  transition ease-in-out hover:outline-yellow focus:outline-yellow hover:shadow-inner focus:shadow-inner'
                />
                <Input
                  id='favColors-2'
                  inputGroup='favColors'
                  element='input'
                  type='text'
                  placeholder='2nd word'
                  validators={[VALIDATOR_REQUIRE()]}
                  onInput={inputHandler}
                  styles='mt-5 w-28 mx-3
                  transition ease-in-out hover:outline-yellow focus:outline-yellow hover:shadow-inner focus:shadow-inner'
                />
                <Input
                  id='favColors-3'
                  inputGroup='favColors'
                  element='input'
                  type='text'
                  placeholder='3rd word'
                  validators={[VALIDATOR_REQUIRE()]}
                  onInput={inputHandler}
                  styles='mt-5 w-28 mx-3
                  transition ease-in-out hover:outline-yellow focus:outline-yellow hover:shadow-inner focus:shadow-inner'
                />
                <Input
                  id='favColors-4'
                  inputGroup='favColors'
                  element='input'
                  type='text'
                  placeholder='4th word'
                  validators={[VALIDATOR_REQUIRE()]}
                  onInput={inputHandler}
                  styles='mt-5 w-28 mx-3
                  transition ease-in-out hover:outline-yellow focus:outline-yellow hover:shadow-inner focus:shadow-inner'
                />
                <Input
                  id='favColors-5'
                  inputGroup='favColors'
                  element='input'
                  type='text'
                  placeholder='5th word'
                  validators={[VALIDATOR_REQUIRE()]}
                  onInput={inputHandler}
                  styles='mt-5 w-28 mx-3
                  transition ease-in-out hover:outline-yellow focus:outline-yellow hover:shadow-inner focus:shadow-inner'
                />
              </div>
            </div>

            {/* page favorite-season */}
            <div id='page1-5' className='mt-16'>
              <h1
                className='text-blue-500 font-barriecito 
              text-3xl tracking-wide mt-5'
              >
                Favorite Season
              </h1>
              <p className='mt-2 mb-4 text-gray-400 font-light text-sm'>
                What is your bestest season?
              </p>

              <div className='flex flex-row'>
                <Input
                  id='favSeason-1'
                  inputGroup='favSeason'
                  element='radio'
                  type='radio'
                  value='0'
                  label='Spring'
                  errorText='Please choose at least one season!'
                  onInput={inputHandler}
                  radioBoxStyles='mt-0 mx-3 w-28
                  p-5 rounded-full block 
                  transition ease-in-out 
                  outline-0 bg-yellow-200 text-gray-400
                  hover:outline-yellow hover:shadow-inner
                  label-checked:bg-yellow-400 label-checked:shadow-inner  
                  label-checked:text-white
                  transform active:scale-95'
                />
                <Input
                  id='favSeason-2'
                  inputGroup='favSeason'
                  element='radio'
                  type='radio'
                  value='1'
                  label='Summer'
                  errorText='Please choose at least one season!'
                  onInput={inputHandler}
                  radioBoxStyles='mt-0 mx-3 w-28
                  p-5 rounded-full block 
                  transition ease-in-out 
                  outline-0 bg-yellow-200 text-gray-400
                  hover:outline-yellow hover:shadow-inner
                  label-checked:bg-yellow-400 label-checked:shadow-inner  
                  label-checked:text-white
                  transform active:scale-95'
                />
                <Input
                  id='favSeason-3'
                  inputGroup='favSeason'
                  element='radio'
                  type='radio'
                  value='2'
                  label='Fall'
                  errorText='Please choose at least one season!'
                  onInput={inputHandler}
                  radioBoxStyles='mt-0 mx-3 w-28
                  p-5 rounded-full block 
                  transition ease-in-out 
                  outline-0 bg-yellow-200 text-gray-400
                  hover:outline-yellow hover:shadow-inner
                  label-checked:bg-yellow-400 label-checked:shadow-inner  
                  label-checked:text-white
                  transform active:scale-95'
                />
                <Input
                  id='favSeason-4'
                  inputGroup='favSeason'
                  element='radio'
                  type='radio'
                  value='3'
                  label='Winter'
                  errorText='Please choose at least one season!'
                  onInput={inputHandler}
                  radioBoxStyles='mt-0 mx-3 w-28
                  p-5 rounded-full block 
                  transition ease-in-out 
                  outline-0 bg-yellow-200 text-gray-400
                  hover:outline-yellow hover:shadow-inner
                  label-checked:bg-yellow-400 label-checked:shadow-inner  
                  label-checked:text-white
                  transform active:scale-95'
                />
              </div>
            </div>

            {/* page favorite-time */}
            <div id='page1-6' className='mt-16'>
              <h1
                className='text-blue-500 font-barriecito 
              text-3xl tracking-wide mt-5'
              >
                Favorite Time
              </h1>
              <p className='mt-2 mb-4 text-gray-400 font-light text-sm'>
                When is your favorite time of the day?
              </p>

              <div className='flex flex-row'>
                <Input
                  id='favTime-1'
                  inputGroup='favTime'
                  element='radio'
                  type='radio'
                  value='0'
                  label='Day'
                  errorText='Please choose at least one weather!'
                  onInput={inputHandler}
                  radioBoxStyles='mt-0 mx-3 w-28
                  p-5 rounded-full block 
                  transition ease-in-out 
                  outline-0 bg-yellow-200 text-gray-400
                  hover:outline-yellow hover:shadow-inner
                  label-checked:bg-yellow-400 label-checked:shadow-inner  
                  label-checked:text-white
                  transform active:scale-95'
                />
                <Input
                  id='favTime-2'
                  inputGroup='favTime'
                  element='radio'
                  type='radio'
                  value='1'
                  label='Night'
                  errorText='Please choose at least one weather!'
                  onInput={inputHandler}
                  radioBoxStyles='mt-0 mx-3 w-28
                  p-5 rounded-full block 
                  transition ease-in-out 
                  outline-0 bg-yellow-200 text-gray-400
                  hover:outline-yellow hover:shadow-inner
                  label-checked:bg-yellow-400 label-checked:shadow-inner  
                  label-checked:text-white
                  transform active:scale-95'
                />
              </div>
            </div>
          </React.Fragment>
        )}

        {/* End of Form */}

        {/* Submit Button */}
        <Button
          styles={`${isOpen ? 'block' : 'hidden'} 
            mt-16 p-4 w-64 shadow-lg
            transition ease-in-out 
            outline-blue
            bg-white text-blue-500 
            hover:bg-blue-500 hover:text-white
            active:bg-blue-600
            transform active:scale-95
            disabled:bg-gray-300
            disabled:text-gray-400
            disabled:outline-gray300
            disabled:cursor-not-allowed`}
          onClick={showNameHandler}
          type='submit'
          // to='/personalized-book'
          // disabled={!formState.formIsValid}
        >
          Create a Story
        </Button>
      </form>
    </React.Fragment>
  );
};

export default FormPage;
