import React, { useContext } from 'react';
import { BookContext } from '../context/BookContext';
import TextareaAutosize from 'react-autosize-textarea';

const BookCovers = (props) => {
  // Keep track of book story with context
  const { bookContent, bookContentDispatch } = useContext(BookContext);
  const { pageNumber } = props;
  let pageName, pageStateKey, textStyle, placeholder;

  // For BookDataReducer
  if (pageNumber === 0) {
    pageName = 'COVER';
    pageStateKey = 'cover';
    textStyle = 'my-10 text-4xl w-60';
    placeholder = 'Edit your own title!';
  } else if (pageNumber === 4) {
    pageName = 'END';
    pageStateKey = 'end';
    textStyle = 'my-16 w-72 text-xl';
    placeholder = 'Edit your own story!';
  }

  // Extract data
  const { Text, MediaImgUris } = bookContent[pageStateKey];

  // Update title or ending comment
  const handleChange = (e) => {
    e.preventDefault();
    bookContentDispatch({ type: pageName, payload: e.target.value });
  };

  return (
    <div
      style={{
        backgroundImage: `url(https://libiam.s3.us-west-1.amazonaws.com/${MediaImgUris})`,
        backgroundSize: '100% 100%',
      }}
      className='w-96 h-tall min-w-80 min-h-96 shadow-xl'
    >
      <TextareaAutosize
        name='content'
        className={`${textStyle} 
        drop-shadow-4xl bg-gray-500 bg-opacity-50 bg-transparent 
        p-2 rounded-md
        text-white font-barriecito
        placeholder-gray-200`}
        placeholder={placeholder}
        onChange={handleChange}
        value={Text}
      />
    </div>
  );
};

export default BookCovers;
