import logo from './logo.svg';
//import './App.css';
import React from 'react';
import {Route} from 'react-router-dom';
import { StyleReset } from 'atomize';
import {LoginPage, RegisterPage, CampPage, PostPage} from './pages';

const App=()=>{
  return (
    <>
      <StyleReset/>
      <Route component={LoginPage} path="/login"/>
      <Route component={RegisterPage} path="/register"/>
      <Route component={CampPage} path="/camp"/>
      <Route component={PostPage} path="/post"/>
    </>
  );
};

export default App;
