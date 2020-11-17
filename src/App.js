import logo from './logo.svg';
import './App.css';
import React from 'react';
import {Route} from 'react-router-dom';
import {Login, Register, CampHome, CampQnA, CampRank, MainPage, MyPage} from './pages';
import {Layout, Menu, Breadcrumb, Icon} from 'antd';
import 'antd/dist/antd.css';

const App=()=>{
  return (
    <>
      <Route component={MainPage} path="/"/>
      <Route component={Login} path="/login"/>
      <Route component={Register} path="/register"/>
      <Route component={CampHome} path="/camphome"/>
      <Route component={CampQnA} path="/campqna"/>
      <Route component={CampRank} path="/camprank"/>
      <Route component={MyPage} path="/mypage"/>
    </>
  );
};

export default App;
