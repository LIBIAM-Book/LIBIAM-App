import React from 'react';

const CreateBookButton = (props) => {
  const { text } = props;

  return (
    <button
      className='mt-6 p-4 w-64 shadow-lg
        transition ease-in-out 
        outline-blue
        bg-white text-blue-500 
        hover:bg-blue-500 hover:text-white
        active:bg-blue-600
        transform active:scale-95'
    >
      {text}
    </button>
  )
}

export default CreateBookButton;