import React from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Routes,
    Route,
  } from "react-router-dom";
import Home from './Components/Home';
import Todolist from './Components/Todolist';
import Options from './Components/Options';
import Diary from './Components/Diary';

const App = () => {
    return (
        <>
        <Router>
        <Home/>
          <Routes>
            <Route path="/todolist" element={<Todolist/>}/>
            <Route path="/home" element={<Options/>}/>
            <Route path="/diary" element={<Diary/>}/>
          </Routes>
        </Router>
        </>
      );
    
};

export default App;