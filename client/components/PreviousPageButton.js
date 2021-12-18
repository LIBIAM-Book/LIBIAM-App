import React from 'react';

const PreviousPageButton = (props) => {
  const { pageNumber, setPageNumber } = props;
  let activationStyle, deactivate;

  // Deactivate button when at first page
  if (pageNumber === 0) {
    activationStyle = 'bg-gray-200 cursor-default';
    deactivate = true;
  } else {
    activationStyle = 'bg-libiamYellow hover:bg-libiamYellow-bright transition';
    deactivate = false;
  }

  // Go to previous page
  const FlipBack = (e) => {
    e.preventDefault();

    if (pageNumber > 0) {
      setPageNumber(pageNumber - 1);
    }
  };

  return (
    <button
      type='button'
      href={`/${pageNumber - 1}`}
      disabled={deactivate}
      className={`w-50px h-50px rounded-full 
      transition ease-in-out 
      text-white 
      active:bg-libiamYellow
      transform active:scale-95
      ${activationStyle}`}
      onClick={FlipBack}
    >
      &#60;
    </button>
  );
};

export default PreviousPageButton;
