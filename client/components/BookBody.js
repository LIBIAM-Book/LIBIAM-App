import React, { useContext } from 'react';
import { BookContext } from '../context/BookContext';
import TextareaAutosize from 'react-autosize-textarea/lib';

const BookBody = (props) => {
  // Keep track of book story with context
  const { bookContent, bookContentDispatch } = useContext(BookContext);
  const { pageNumber } = props;
  let pageName, pageStateKey;

  // For BookDataReducer
  if (pageNumber === 1) {
    pageName = 'PAGE_1';
    pageStateKey = 'firstPage';
  } else if (pageNumber === 2) {
    pageName = 'PAGE_2';
    pageStateKey = 'secondPage';
  } else if (pageNumber === 3) {
    pageName = 'PAGE_3';
    pageStateKey = 'thirdPage';
  }

  // Extract data
  const { Text, MediaImgUris } = bookContent[pageStateKey];

  // Update book story
  const handleChange = (e) => {
    e.preventDefault();
    bookContentDispatch({ type: pageName, payload: e.target.value });
  };

  return (
    <div className='flex flex-row'>
      <div className='shadow-xl'>
        <div
          className='w-96 min-w-80 h-tall min-h-96 
          shadow-bookLeft
        bg-libiamYellow-light'
        >
          <TextareaAutosize
            className='w-72 mt-20 m-2 p-2 rounded-lg max-h-80 h-36'
            onChange={handleChange}
            name='story'
            placeholder='Edit your own story here!'
            value={Text}
          ></TextareaAutosize>
        </div>
      </div>
      <div className='shadow-xl'>
        <div
          style={{
            backgroundImage: `url(https://libiam.s3.us-west-1.amazonaws.com/${MediaImgUris})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
          className='w-96 min-w-80 h-tall min-h-96 
        shadow-bookRight
        bg-libiamYellow-light'
        ></div>
      </div>
    </div>
  );
};

export default BookBody;
