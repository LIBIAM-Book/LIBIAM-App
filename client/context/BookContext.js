import React, { createContext, useState, useEffect } from 'react';

const defaultValues = {
  firstname: "",
  gender: "",
  favorite1: "",
  favorite2: "",
  favorite3: "",
  favorite4: "",
  favorite5: "",
  storyWritingJobStatus: "N/A",
  bookContent: [],
}

export const BookContext = createContext(defaultValues);

export const BookProvider = ({ children }) => {
  // Set up useEffect if needed

  return (
    <BookContext.Provider
      value={{
        ...defaultValues,
      }}
    >
      {children}
    </BookContext.Provider>
  )
}