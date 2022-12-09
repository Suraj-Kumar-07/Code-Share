import React from 'react';
import Home from './Component/Home';
import CreateJoin from './Component/CreateJoin'
import Room from './Component/Room'
import {BrowserRouter as Router, Route, Routes } from  'react-router-dom'
import GettingStarted from './Component/GettingStarted';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route exact path = '/' element = {<Home/>} />
        <Route exact path = '/enter' element={<GettingStarted/>}/>
        <Route exact path = '/create' element={<CreateJoin tittle='Create'/>}/>
        <Route exact path = '/join' element={<CreateJoin tittle ='Join'/>}/>
        <Route exact path = '/room' element={<Room/>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
