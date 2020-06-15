import React, {Fragment} from 'react';
import NavBar from './components/layout/NavBar';
import Landing from './components/layout/Landing';
import './App.css';

const App = () => {
  return (
    <Fragment>
      <NavBar />
      <Landing />
    </Fragment>
  );
}

export default App;