import React, { createContext, useReducer } from 'react';
import { bookDataReducer } from '../util/bookDataReducer';

// INITIAL DATA THAT WILL BE USED IN PRODUCTION
const initialData = {
  cover: {
    id: 0,
    pageType: '',
    Text: '',
    MediaImgUris: [],
  },
  firstPage: {
    id: 1,
    pageType: '',
    Text: '',
    MediaImgUris: [],
  },
  secondPage: {
    id: 2,
    pageType: '',
    Text: '',
    MediaImgUris: [],
  },
  thirdPage: {
    id: 3,
    pageType: '',
    Text: '',
    MediaImgUris: [],
  },
  end: {
    id: 4,
    pageType: '',
    Text: '',
    MediaImgUris: [],
  },
};

export const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [bookContent, bookContentDispatch] = useReducer(
    bookDataReducer,
    initialData
  );

  return (
    <BookContext.Provider value={{ bookContent, bookContentDispatch }}>
      {children}
    </BookContext.Provider>
  );
};
