import React from 'react';

const NextPageButton = (props) => {
  const { pageNumber, setPageNumber } = props;
  let activationStyle, deactivate;

  // Deactivate button when at last page
  if (pageNumber === 4) {
    activationStyle = 'bg-gray-200  cursor-default';
    deactivate = true;
  } else {
    activationStyle = 'bg-libiamYellow hover:bg-libiamYellow-bright transition';
    deactivate = false;
  }

  // Go to next page
  const FlipNext = (e) => {
    e.preventDefault();

    if (pageNumber < 4) {
      setPageNumber(pageNumber + 1);
    }
  };

  return (
    <button
      className={`w-50px h-50px rounded-full 
      transition ease-in-out 
      text-white 
      active:bg-libiamYellow
      transform active:scale-95
      ${activationStyle}`}
      disabled={deactivate}
      onClick={FlipNext}
    >
      &#62;
    </button>
  );
};

export default NextPageButton;
