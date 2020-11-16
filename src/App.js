import logo from './logo.svg';
//import './App.css';
import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import {Route} from 'react-router-dom';
import {Autentication, CampHome, CampQnA, CampRank, MainPage, MyPage} from './pages';

const App=()=>{
  return (
    <>
      <Route component={MainPage} path="/"/>
      <Route component={Autentication} path="/authentication"/>
      <Route component={CampHome} path="/camphome"/>
      <Route component={CampQnA} path="/campqna"/>
      <Route component={CampRank} path="/camprank"/>
      <Route component={MyPage} path="/mypage"/>
    </>
  );
};

export default App;
