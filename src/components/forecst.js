import React from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import logo from "../logo.png";
import { connect } from "react-redux";
import lv0 from "../level_tree/lv0.png";
import lv1 from "../level_tree/lv1.png";
import lv2 from "../level_tree/lv2.png";
import { getLevel } from "../actions/authentication";
import { db } from "../firebase";
import Profile from "./profile";

class Forecst extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: window.sessionStorage.getItem("id"),
      point: 0,
      isLoggedIn: this.isLoggedIn
    };

    this.handleHome = this.handleHome.bind(this);
  }

  handleHome() {
    this.props.history.push("/CS473DesignProject-FORECST");
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
    this.props.history.push("/CS473DesignProject-FORECST");
  };

  componentWillMount() {
    const id = window.sessionStorage.getItem("id");
    console.log("setting compoent did moun in forecst", id);
    if (id) {
      this.onLogin();
    } else {
      this.onLogout();
    }

    //this.getMarker();
  }

  getMarker = async () => {
    console.log("current user: ", this.props.currentUser);
    if (this.props.status.isLoggedIn) {
      const snapshot = await db
        .collection("Users")
        .doc(this.props.currentUser)
        .get();
      this.setState({ 
        point: snapshot.data().point,
        currentUser: this.props.currentUser
      });
    }
  };

  render() {
    var point = this.state.point;
    const level = this.props.getLevel(point);
    let currentTree = null;

    switch (level) {
      case 1:
        currentTree = <img src={lv1}></img>;
        break;
      case 2:
        currentTree = <img src={lv2}></img>;
        break;
      default:
        currentTree = <img src={lv0}></img>;
        break;
    }

    const joinButton = (
      <Link className="nav-link page-scroll" to="/login">
        Sign in
      </Link>
    );

    const mypageButton = (
      <li class="nav-item dropdown">
        <a
          class="nav-link dropdown-toggle"
          id="navbarDropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <Profile writer={window.sessionStorage.getItem("id")}></Profile>
          {window.sessionStorage.getItem("id")}
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <Link class="dropdown-item" to={{pathname: `/mypage/${this.props.currentUser}`}}>
            <span class="item-text">MyPage</span>
          </Link>
          <div class="dropdown-items-divide-hr"></div>
          <a class="dropdown-item" onClick={this.onLogout}>
            <span class="item-text">Sign out</span>
          </a>
        </div>
      </li>
    );

    return (
      <nav
        className="navbar navbar-expand-lg navbar-dark navbar-custom top-nav-collapse"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "0.5rem 5rem 0.5rem 5rem"
        }}
      >
        <Link
          className="navbar-brand logo-image"
          to="/CS473DesignProject-FORECST"
        >
          <img src={logo} alt="alternative" />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExampleDefault"
          aria-controls="navbarsExampleDefault"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-awesome fas fa-bars"></span>
          <span className="navbar-toggler-awesome fas fa-times"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExampleDefault">
          <ul className="navbar-nav ml-auto">
            <li
              className="nav-item"
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Link className="nav-link page-scroll" to="/explore">
                Explore Hackathons
              </Link>
            </li>
            <li
              className="nav-item"
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <a
                className="nav-link page-scroll"
                href="https://github.com/youngjae99/CS473DesignProject-FORECST"
              >
                Github
              </a>
            </li>
            <li className="nav-item">
              {window.sessionStorage.getItem("id") ? mypageButton : joinButton}
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

Forecst.propTypes = {
  isLoggedIn: PropTypes.bool,
  currentUser: PropTypes.string,
};

Forecst.defaultProps = {
  isLoggedIn: false,
  currentUser: "Youngjae",
};

const mapStateToProps = (state) => {
  return {
    status: state.authentication.status,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getLevel: (point) => {
      return getLevel(point);
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Forecst));
