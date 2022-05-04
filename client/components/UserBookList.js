import React from 'react';

import './UserBookList.css';

const MOCK_DATA = [
  { title: 'Jaguar Green', id: 1032 },
  { id: 123091, title: 'Cola Hit' },
  { id: 1230, title: 'Duro Guru' },
];

const UserBookList = (props) => {
  const { listItems } = props;

  // NEED UPDATE Replace Mock Data with listItems when db complete
  if (MOCK_DATA.length === 0) {
    return (
      <>
        <ul className='profile_list_wrapper'>
          <li className='profile_list_item'>No books yet!</li>
        </ul>
      </>
    );
  }
  return (
    <ul className='profile_list_wrapper'>
      {MOCK_DATA.map((x) => (
        <li key={x.id} className='profile_list_item'>
          {x.title}
        </li>
      ))}
    </ul>
  );
};

export default UserBookList;
