import logo from './logo.svg';
//import './App.css';
import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import {Route} from 'react-router-dom';
import {Login, Register, CampPage, CampHome, CampQnA, CampRank, MainPage, MyPage, Autentication} from './pages';
import {Layout, Menu, Breadcrumb, Icon} from 'antd';
import 'antd/dist/antd.css';

const App=()=>{
  return (
    <>
      <Route component={MainPage} path="/main"/>
      <Route component={Login} path="/login"/>
      <Route component={Register} path="/register"/>
      <Route component={CampHome} path="/camp/home"/>
      <Route component={CampQnA} path="/camp/qna"/>
      <Route component={CampRank} path="/camp/rank"/>
      <Route component={CampPage} path="/camp/"/>
      <Route component={MyPage} path="/mypage"/>
    </>
  );
};

export default App;
