import React from 'react';
// Pages
import {Home, Login, Register, CampHome, CampQnA, CampRank, MainPage, MyPage} from './pages';
// Router
import {Route} from "react-router-dom";
import 'antd/dist/antd.css';
// Redux
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';

const store=createStore(reducers, applyMiddleware(thunk));

class App extends React.Component{
  render(){
    return(
      <Provider store={store}>
        <Route path ="/" component={Home}></Route>
        <Route path ="/CS473_DesignProject" component={MainPage}></Route>
        <Route component={Login} path="/login"/>
        <Route component={Register} path="/register"/>
        <Route component={CampHome} path="/camphome"/>
        <Route component={CampQnA} path="/campqna"/>
        <Route component={CampRank} path="/camprank"/>
        <Route component={MyPage} path="/mypage"/>
      </Provider>
    );
  }
}

export default App;
