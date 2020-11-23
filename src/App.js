import React from 'react';
// Pages
import {Home, Login, Register, CampHome, CampQnA, CampRank, MainPage, MyPage, CampJoin, UploadPost, CampPage} from './pages';
// Router
import {Route, Router} from "react-router-dom";
import 'antd/dist/antd.css';
// Redux
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';
import {createBrowserHistory} from 'history';

const store=createStore(reducers, applyMiddleware(thunk));
const browserHistory=createBrowserHistory();

class App extends React.Component{
  render(){
    return(
      <Provider store={store}>
        <Router history={browserHistory}>
          <Route path ="/" component={Home}></Route>
          <Route path ="/CS473_DesignProject" component={MainPage}></Route>
          <Route component={Login} path="/login"/>
          <Route component={Register} path="/register"/>
          <Route component={CampJoin} path="/campjoin"/>
          <Route component={CampHome} path="/camphome"/>
          <Route component={CampQnA} path="/campqna"/>
          <Route component={CampRank} path="/camprank"/>
          <Route component={MyPage} path="/mypage"/>
          <Route component={UploadPost} path="/uploadpost"/>
          <Route component={CampPage} path="/camp/"/>
        </Router>
      </Provider>
    );
  }
}

export default App;
