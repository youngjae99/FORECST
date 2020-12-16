import React from "react";
// Pages
import {
  Home,
  Login,
  Register,
  CampHome,
  CampQnA,
  CampRank,
  MainPage,
  MyPage,
  CampJoin,
  UploadPost,
  CampPage,
  UploadQnA,
  CampRankResult,
  Explore,
  UploadProject,
  CampDescription,
  Tutorial
} from "./pages";
// Components
import { QnAsingle, IndividualPage } from "./components/index";
// Router
import { Route, Router } from "react-router-dom";
import "antd/dist/antd.css";
// Redux
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";


const store = createStore(reducers, applyMiddleware(thunk));
const browserHistory = createBrowserHistory();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: false,
      onLogin: this.onLogin,
      onLogout: this.onLogout,
    };
  }

   // Login Func
   onLogin = () => {
    this.setState({
      isLoggedIn: true,
    });
  };
  // Logout Func
  onLogout = () => {
    console.log("logout!");
    this.setState({
      isLoggedIn: false,
    });
    //SessionStorage Clear
    window.sessionStorage.clear();
    this.props.history.push("/FORECST");
  };

  render() {
    const { logged, onLogout } = this.state;
    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          <Route path="/" component={Home}></Route>
          <Route
          
            path="/FORECST"
            component={MainPage}
          ></Route>
          <Route component={Explore} path="/explore" />
          <Route component={Login} path="/login" />
          <Route component={Register} path="/register" />
          <Route component={CampJoin} path="/campjoin" />
          <Route component={CampHome} path="/camphome" />
          <Route component={CampQnA} path="/campqna" />
          <Route component={CampRank} path="/camprank" />
          <Route component={MyPage} path="/mypage" />
          <Route component={UploadPost} path="/uploadpost" />
          <Route component={CampPage} path="/camp/" />
          <Route component={UploadQnA} path="/qnawrite" />
          <Route component={CampRankResult} path="/camprankresult" />
          <Route component={QnAsingle} path="/campqnaview" />
          <Route component={UploadProject} path="/uploadproject" />
          <Route component={CampDescription} path="/campdescription" />
          <Route component={Tutorial} path="/tutorial" />
          <Route component={IndividualPage} path="/individual" />
        </Router>
      </Provider>
    );
  }
}

export default App;
