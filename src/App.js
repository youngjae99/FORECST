import logo from './logo.svg';
import './App.css';
import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import {Autentication, CampHome, CampQnA, CampRank, MainPage, MyPage} from './pages';
import Post from './pages/post';
import CampRankResult from './pages/CampRankResult';
import QnAWrite from './pages/qnawrite';

const App=()=>{
  return (
    <>
          <Route component={Post} path="/post"/>

      <Route component={MainPage} path="/"/>
      <Route component={Autentication} path="/authentication"/>
      <Route component={CampHome} path="/camphome"/>
      <Route component={CampQnA} path="/campqna"/>
      <Route component={CampRank} path="/camprank"/>
      <Route component={MyPage} path="/mypage"/>
      <Route component={CampRankResult} path="/camprankresult"/>
      <Route component={QnAWrite} path="/qnawrite"/>
    </>
  );
};

export default App;
