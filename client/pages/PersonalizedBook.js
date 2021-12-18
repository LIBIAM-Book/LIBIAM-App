import React, { useState } from 'react';
import BookBody from '../components/BookBody';
import BookCovers from '../components/BookCovers';
import NextPageButton from '../components/NextPageButton';
import PreviousPageButton from '../components/PreviousPageButton';
import SubmitBook from '../components/SubmitBook';

const PersonalizedBook = (props) => {
  // Track page number
  const [pageNumber, setPageNumber] = useState(0);
  const { childName } = props;
  const child = childName;
  let heading;

  // Assign appropriate heading for each page
  if (pageNumber === 0) {
    heading = `Preview your personalized book for ${child}`;
  } else if (pageNumber === 4) {
    heading = 'Submit Book';
  } else {
    heading = 'How do you want to change your story?';
  }

  return (
    <div className='flex flex-col justify-center items-center w-full h-full mt-20'>
      <h1 className='font-roboto mb-12 text-lg font-medium'>{heading}</h1>
      <div className='flex justify-center items-center h-auto w-full'>
        <div className='mr-4'>
          <PreviousPageButton
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
          />
        </div>
        {pageNumber === 0 || pageNumber === 4 ? (
          <BookCovers pageNumber={pageNumber} />
        ) : (
          ''
        )}
        {pageNumber > 0 && pageNumber < 4 ? (
          <BookBody pageNumber={pageNumber} />
        ) : (
          ''
        )}
        <div className='ml-4'>
          <NextPageButton
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
          />
        </div>
      </div>
      {pageNumber === 4 ? <SubmitBook /> : ''}
    </div>
  );
};

export default PersonalizedBook;
