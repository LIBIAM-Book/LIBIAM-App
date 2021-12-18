import React, { useContext } from 'react';
import { BookContext } from '../context/BookContext';

const SubmitBook = () => {
  // For future API call
  // const apiAddress = '';

  const { bookContent } = useContext(BookContext);

  // Reorganize data when submitting the book
  const submitBook = (e) => {
    e.preventDefault();

    const finalizedBook = [];

    for (let key in bookContent) {
      finalizedBook.push(bookContent[key]);
    }

    // For DEV purposes
    console.log(finalizedBook);
  };

  return (
    <button
      type='submit'
      onClick={submitBook}
      className='mt-12 px-4 py-2 text-white bg-blue-600 hover:bg-blue-500 transition rounded-full'
    >
      Submit Book
    </button>
  );
};

export default SubmitBook;
