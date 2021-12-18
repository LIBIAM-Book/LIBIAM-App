import React from 'react';

import Button from '../components/Button';

const Playground = ({ testingSentence, setTestingSentence }) => {
  return (
    <div>
      <h1>{testingSentence}</h1>
      <textarea
        value={testingSentence}
        className='border-2 border-red-500'
        type='text'
        onChange={(event) =>
          event.target && setTestingSentence(event.target.value)
        }
      />
      <Button to='/'>Go back to Home</Button>
    </div>
  );
};

export default Playground;
