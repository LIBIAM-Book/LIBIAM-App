import React, { useState } from 'react';
import { Route } from 'react-router-dom';

import Home from './pages/Home';
import PersonalizedBook from './pages/PersonalizedBook';
import FormPage from './pages/FormPage';
import Playground from './pages/Playground';
import { BookProvider } from './context/BookContext';

const App = () => {
  // Delete below state- for dev purpose only
  const [testingSentence, setTestingSentence] = useState('I am alive! 🎉');
  const [childName, setChildName] = useState('');

  return (
    <>
      <Route exact path='/'>
        <Home />
      </Route>
      {/* Wrap Form page and Book display page for accessing BookContext values */}
      <BookProvider>
        <Route exact path='/form'>
          <FormPage setChildName={setChildName} />
        </Route>
        <Route exact path='/personalized-book'>
          <PersonalizedBook childName={childName} />
        </Route>
      </BookProvider>
      {/** Below page is just playground page for dev purpose, feel free to delete */}
      <Route exact path='/playground'>
        <Playground
          testingSentence={testingSentence}
          setTestingSentence={setTestingSentence}
        />
      </Route>
    </>
  );
};

export default App;
