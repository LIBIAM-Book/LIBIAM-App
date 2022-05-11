import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import axios from 'axios';
import Button from '../components/Button';
import { BookContext } from '../context/BookContext';

import './FormPage.css';

import testData from '../mockData/test.json';

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
  const { cred } = useAuth();
  const [bookRendered, setBookRendered] = useState(false);
  const { setChildName } = props;

  const { bookContentDispatch } = useContext(BookContext);

  const isOpenHandler = () => {
    setIsOpen(true);
  };

  // DEV PURPOSE. WILL MIGRATE TO formSubmitHandler.
  const testHandler = (e) => {
    e.preventDefault();
    // Loading start
    console.log('Loading msg start: creating your book...');

    setChildName(e.target.name.value);

    axios
      .get('/api/books')
      .then((res) => {
        // book content dispatch
        let payload;
        payload = dataLoader(testData.Data);
        // payload = dataLoader(res.Data);
        bookContentDispatch({ type: 'LOAD_ALL', payload });

        // Loading end && move to book page
        console.log('Loading msg end: will redirect to book page');
        setBookRendered('redirect to book page');
      })
      .catch((err) => {
        console.error(err);
      });

    // 데이터 받는동안 로딩 메세지(creating your book 메세지)
    // 데이터 북컨텐트 디스패치 하고
    // 로딩 끝내고 책 페이지로 이동
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();

    // collect survey data
    let name = event.target.name.value;

    let gender = parseInt(event.target.gender.value);

    let favThingsArr = [];
    let eTargetFavThings = event.target.favThings;
    for (let i = 0; i < eTargetFavThings.length; i++) {
      if (!eTargetFavThings[i].value) {
        continue;
      }
      favThingsArr.push(eTargetFavThings[i].value);
    }
    let favThings = favThingsArr.toString();

    let favPlacesArr = [];
    let eTargetFavPlaces = event.target.favPlaces;
    for (let i = 0; i < eTargetFavPlaces.length; i++) {
      if (!eTargetFavPlaces[i].value) {
        continue;
      }
      favPlacesArr.push(eTargetFavPlaces[i].value);
    }
    let favPlaces = favPlacesArr.toString();

    let favColorsArr = [];
    let eTargetFavColors = event.target.favColors;
    for (let i = 0; i < eTargetFavColors.length; i++) {
      if (!eTargetFavColors[i].value) {
        continue;
      }
      favColorsArr.push(eTargetFavColors[i].value);
    }
    let favColors = favColorsArr.toString();

    let favSeason = parseInt(event.target.favSeason.value);

    let favTime = parseInt(event.target.favTime.value);

    const surveyData = {
      firstName: name,
      gender: gender,
      favThings: favThings,
      favPlaces: favPlaces,
      favColors: favColors,
      favSeason: favSeason,
      favTime: favTime,
    };

    // Send survey data
    axios
      .post(
        '/api/books',
        {
          ...surveyData,
        },
        {
          headers: {
            'X-Access-Token': `Bearer ${cred?.accessToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });

    // DEV PURPOSE
    console.log(surveyData);
  };

  return (
    <React.Fragment>
      <form className='flex items-center flex-col pb-20' onSubmit={testHandler}>
        {/* Page 1-1 */}
        <div id='page1-1'>
          <h1 className='text-blue-500 font-barriecito text-4xl mt-56'>
            Who is this book for?
          </h1>
          <input
            value='testName'
            readOnly
            required
            name='name'
            type='text'
            placeholder='First Name'
            className='form_input w-72 transition ease-in-out 
            hover:outline-yellow focus:outline-yellow hover:shadow-inner 
            focus:shadow-inner focus:outline-none rounded-full p-5 text-black text-center'
          />
          <div className='flex radio-wrapper'>
            <label htmlFor='boy'>
              <input
                required
                name='gender'
                id='boy'
                type='radio'
                value='0'
                className='radio-visibility'
              />
              <div className='radio-div p-5 rounded-full block w-full transition ease-in-out outline-0 hover:outline-yellow hover:shadow-inner label-checked:bg-yellow-400 label-checked:shadow-inner label-checked:text-white transform active:scale-95'>
                Boy
              </div>
            </label>
            <label htmlFor='girl'>
              <input
                checked
                readOnly
                name='gender'
                id='girl'
                type='radio'
                value='1'
                className='radio-visibility'
              />
              <div className='radio-div p-5 rounded-full block w-full transition ease-in-out outline-0 hover:outline-yellow hover:shadow-inner label-checked:bg-yellow-400 label-checked:shadow-inner label-checked:text-white transform active:scale-95'>
                Girl
              </div>
            </label>
          </div>

          {!isOpen && (
            <button
              className='inline-block rounded-full mt-24 p-4 w-72 shadow-lg transition ease-in-out outline-blue bg-white text-blue-500 hover:bg-blue-500 hover:text-white active:bg-blue-600 transform active:scale-95'
              onClick={isOpenHandler}
            >
              Tell us more about you!
            </button>
          )}
        </div>

        {isOpen && (
          <React.Fragment>
            {/* page favorite-Things */}
            <div id='page1-2' className='mt-20'>
              <h1 className='text-blue-500 font-barriecito text-3xl tracking-wide mt-10'>
                Favorite Things
              </h1>
              <p className='mt-2 text-gray-400 font-light text-sm'>
                Please enter your 5 favorite things!
              </p>
              <div className='flex flex-row'>
                <input
                  value='testThing1'
                  readOnly
                  required
                  name='favThings'
                  id='favThings-1'
                  placeholder='1st word'
                  type='text'
                  className='form_input 
                  focus:outline-none rounded-full p-5 text-black text-center w-28 mx-3 transition ease-in-out hover:outline-yellow focus:outline-yellow hover:shadow-inner focus:shadow-inner'
                />
                <input
                  value='testThing2'
                  readOnly
                  name='favThings'
                  id='favThings-2'
                  placeholder='2nd word'
                  type='text'
                  className='form_input 
                  focus:outline-none rounded-full p-5 text-black text-center w-28 mx-3 transition ease-in-out hover:outline-yellow focus:outline-yellow hover:shadow-inner focus:shadow-inner'
                />
                <input
                  name='favThings'
                  id='favThings-3'
                  placeholder='3rd word'
                  type='text'
                  className='form_input 
                  focus:outline-none rounded-full p-5 text-black text-center w-28 mx-3 transition ease-in-out hover:outline-yellow focus:outline-yellow hover:shadow-inner focus:shadow-inner'
                />
                <input
                  name='favThings'
                  id='favThings-4'
                  placeholder='4th word'
                  type='text'
                  className='form_input 
                  focus:outline-none rounded-full p-5 text-black text-center w-28 mx-3 transition ease-in-out hover:outline-yellow focus:outline-yellow hover:shadow-inner focus:shadow-inner'
                />
                <input
                  name='favThings'
                  id='favThings-5'
                  placeholder='5th word'
                  type='text'
                  className='form_input focus:outline-none rounded-full p-5 text-black text-center w-28 mx-3 transition ease-in-out hover:outline-yellow focus:outline-yellow hover:shadow-inner focus:shadow-inner'
                />
              </div>
            </div>

            {/* page favorite-places */}
            <div id='page1-3' className='mt-16'>
              <h1 className='text-blue-500 font-barriecito text-3xl tracking-wide mt-5'>
                Favorite Places
              </h1>
              <p className='mt-2 text-gray-400 font-light text-sm'>
                Please enter your 5 favorite places!
              </p>

              <div className='flex flex-row'>
                <input
                  value='testPlace1'
                  readOnly
                  required
                  name='favPlaces'
                  id='favPlaces-1'
                  placeholder='1st word'
                  type='text'
                  className='form_input focus:outline-none rounded-full p-5 text-black text-center w-28 mx-3 transition ease-in-out hover:outline-yellow focus:outline-yellow hover:shadow-inner focus:shadow-inner'
                />
                <input
                  value='testPlace2'
                  readOnly
                  name='favPlaces'
                  id='favPlaces-2'
                  placeholder='2nd word'
                  type='text'
                  className='form_input focus:outline-none rounded-full p-5 text-black text-center w-28 mx-3 transition ease-in-out hover:outline-yellow focus:outline-yellow hover:shadow-inner focus:shadow-inner'
                />
                <input
                  name='favPlaces'
                  id='favPlaces-3'
                  placeholder='3rd word'
                  type='text'
                  className='form_input focus:outline-none rounded-full p-5 text-black text-center w-28 mx-3 transition ease-in-out hover:outline-yellow focus:outline-yellow hover:shadow-inner focus:shadow-inner'
                />
                <input
                  name='favPlaces'
                  id='favPlaces-4'
                  placeholder='4th word'
                  type='text'
                  className='form_input focus:outline-none rounded-full p-5 text-black text-center w-28 mx-3 transition ease-in-out hover:outline-yellow focus:outline-yellow hover:shadow-inner focus:shadow-inner'
                />
                <input
                  name='favPlaces'
                  id='favPlaces-5'
                  placeholder='5th word'
                  type='text'
                  className='form_input focus:outline-none rounded-full p-5 text-black text-center w-28 mx-3 transition ease-in-out hover:outline-yellow focus:outline-yellow hover:shadow-inner focus:shadow-inner'
                />
              </div>
            </div>

            {/* page favorite-colors */}
            <div id='page1-4' className='mt-16'>
              <h1 className='text-blue-500 font-barriecito text-3xl tracking-wide mt-5'>
                Favorite Colors
              </h1>
              <p className='mt-2 text-gray-400 font-light text-sm'>
                Please enter your 5 favorite colors!
              </p>
              <div className='flex flex-row'>
                <input
                  value='testColor-1'
                  readOnly
                  required
                  name='favColors'
                  id='favColors-1'
                  placeholder='1st word'
                  type='text'
                  className='form_input focus:outline-none rounded-full p-5 text-black text-center w-28 mx-3 transition ease-in-out hover:outline-yellow focus:outline-yellow hover:shadow-inner focus:shadow-inner'
                />
                <input
                  value='testColor-2'
                  readOnly
                  name='favColors'
                  id='favColors-2'
                  placeholder='2nd word'
                  type='text'
                  className='form_input focus:outline-none rounded-full p-5 text-black text-center w-28 mx-3 transition ease-in-out hover:outline-yellow focus:outline-yellow hover:shadow-inner focus:shadow-inner'
                />
                <input
                  value='testColor-3'
                  readOnly
                  name='favColors'
                  id='favColors-3'
                  placeholder='3rd word'
                  type='text'
                  className='form_input focus:outline-none rounded-full p-5 text-black text-center w-28 mx-3 transition ease-in-out hover:outline-yellow focus:outline-yellow hover:shadow-inner focus:shadow-inner'
                />
                <input
                  name='favColors'
                  id='favColors-4'
                  placeholder='4th word'
                  type='text'
                  className='form_input focus:outline-none rounded-full p-5 text-black text-center w-28 mx-3 transition ease-in-out hover:outline-yellow focus:outline-yellow hover:shadow-inner focus:shadow-inner'
                />
                <input
                  name='favColors'
                  id='favColors-5'
                  placeholder='5th word'
                  type='text'
                  className='form_input focus:outline-none rounded-full p-5 text-black text-center w-28 mx-3 transition ease-in-out hover:outline-yellow focus:outline-yellow hover:shadow-inner focus:shadow-inner'
                />
              </div>
            </div>

            {/* page favorite-season */}
            <div id='page1-5' className='mt-16'>
              <h1 className='text-blue-500 font-barriecito text-3xl tracking-wide mt-5'>
                Favorite Season
              </h1>
              <p className='mt-2 mb-4 text-gray-400 font-light text-sm'>
                What is your bestest season?
              </p>
              <div className='flex flex-row radio-wrapper'>
                <label htmlFor='favSeason-1'>
                  <input
                    required
                    name='favSeason'
                    id='favSeason-1'
                    type='radio'
                    value='0'
                    className='radio-visibility'
                  />
                  <div className='radio-div p-5 rounded-full block w-full transition ease-in-out outline-0 hover:outline-yellow hover:shadow-inner label-checked:bg-yellow-400 label-checked:shadow-inner label-checked:text-white transform active:scale-95'>
                    Spring
                  </div>
                </label>
                <label htmlFor='favSeason-2'>
                  <input
                    name='favSeason'
                    id='favSeason-2'
                    type='radio'
                    value='1'
                    className='radio-visibility'
                  />
                  <div className='radio-div p-5 rounded-full block w-full transition ease-in-out outline-0 hover:outline-yellow hover:shadow-inner label-checked:bg-yellow-400 label-checked:shadow-inner label-checked:text-white transform active:scale-95'>
                    Summer
                  </div>
                </label>
                <label htmlFor='favSeason-3'>
                  <input
                    name='favSeason'
                    id='favSeason-3'
                    type='radio'
                    value='2'
                    className='radio-visibility'
                  />
                  <div className='radio-div p-5 rounded-full block w-full transition ease-in-out outline-0 hover:outline-yellow hover:shadow-inner label-checked:bg-yellow-400 label-checked:shadow-inner label-checked:text-white transform active:scale-95'>
                    Fall
                  </div>
                </label>
                <label htmlFor='favSeason-4'>
                  <input
                    checked
                    readOnly
                    name='favSeason'
                    id='favSeason-4'
                    type='radio'
                    value='3'
                    className='radio-visibility'
                  />
                  <div className='radio-div p-5 rounded-full block w-full transition ease-in-out outline-0 hover:outline-yellow hover:shadow-inner label-checked:bg-yellow-400 label-checked:shadow-inner label-checked:text-white transform active:scale-95'>
                    Winter
                  </div>
                </label>
              </div>
            </div>

            {/* page favorite-time */}
            <div id='page1-6' className='mt-16'>
              <h1 className='text-blue-500 font-barriecito text-3xl tracking-wide mt-5'>
                Favorite Time
              </h1>
              <p className='mt-2 mb-4 text-gray-400 font-light text-sm'>
                When is your favorite time of the day?
              </p>

              <div className='flex flex-row radio-wrapper'>
                <label htmlFor='favTime-1'>
                  <input
                    checked
                    readOnly
                    name='favTime'
                    id='favTime-1'
                    type='radio'
                    value='0'
                    className='radio-visibility'
                  />
                  <div className='radio-div p-5 rounded-full block w-full transition ease-in-out outline-0 hover:outline-yellow hover:shadow-inner label-checked:bg-yellow-400 label-checked:shadow-inner label-checked:text-white transform active:scale-95'>
                    Day
                  </div>
                </label>
                <label htmlFor='favTime-2'>
                  <input
                    name='favTime'
                    id='favTime-2'
                    type='radio'
                    value='1'
                    className='radio-visibility'
                  />
                  <div className='radio-div p-5 rounded-full block w-full transition ease-in-out outline-0 hover:outline-yellow hover:shadow-inner label-checked:bg-yellow-400 label-checked:shadow-inner label-checked:text-white transform active:scale-95'>
                    Night
                  </div>
                </label>
              </div>
            </div>
          </React.Fragment>
        )}

        <Button
          type='submit'
          styles={`
          ${isOpen ? 'block' : 'hidden'}
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
          // to='/personalized-book'
          // disabled={!formState.formIsValid}
        >
          Create a Story
        </Button>
      </form>
      {bookRendered && <Redirect to='/personalized-book' />}
    </React.Fragment>
  );
};

export default FormPage;
