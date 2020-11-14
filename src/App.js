import logo from './logo.svg';
import './App.css';
import React from 'react';
import {Route} from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CampPage from './pages/CampPage';
import PostPage from './pages/PostPage';



const App=()=>{
  return (
    <>
      <Route component={LoginPage} path="/login"/>
      <Route component={RegisterPage} path="/register"/>
      <Route component={CampPage} path="/camp"/>
      <Route component={PostPage} path="/post"/>
    </>
  );
};

export default App;
