import React from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { PageHeader, Button, Avatar, Row, Col } from "antd";
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
      currentUser: "",
      point: 0,
    };

    this.handleHome = this.handleHome.bind(this);
  }

  handleHome() {
    this.props.history.push("/CS473DesignProject-FORECST");
  }

  componentDidMount() {
    this.getMarker();
  }

  getMarker = async () => {
    console.log("current user: ", this.props.currentUser);
    if (this.props.status.isLoggedIn) {
      const snapshot = await db
        .collection("Users")
        .doc(this.props.currentUser)
        .get();
      console.log(snapshot);
      this.setState({ point: snapshot.data().point });
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
      /*
      <PageHeader
        ghost={false}
        extra={[
          <Link
            to={"/login"}
            style={{ color: "#000", marginRight: 20, fontSize: 18 }}
          >
            Login
          </Link>,
          <Button type="primary">
            <Link to={"/register"} style={{ fontSize: 18 }}>
              JOIN
            </Link>
          </Button>,
        ]}
      />
      */
      <Link className="nav-link page-scroll" to="/login">
        Sign in
      </Link>
    );

    const mypageButton = (
      /*
      <PageHeader
        ghost={false}
        style={{ padding: 0, backgroundColor: "#fff", borderRadius: "10px",  marginLeft:"10px" }}
        extra={[
          <Link to={"/mypage"} style={{ color: "#000", fontSize: 18, marginLeft:"15px" }}>
            {this.props.currentUser}
            <Profile writer={this.props.currentUser}></Profile>
          </Link>,
        ]}
      />
      */

      <li class="nav-item dropdown">
        <a
          class="nav-link dropdown-toggle page-scroll"
          href="#about"
          id="navbarDropdown"
          role="button"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <Profile writer={this.props.currentUser}></Profile>
          {this.props.currentUser}
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <Link class="dropdown-item" to={"/mypage"}>
            <span class="item-text">MyPage</span>
          </Link>
          <div class="dropdown-items-divide-hr"></div>
          <a class="dropdown-item" href="privacy-policy.html">
            <span class="item-text">Sign out</span>
          </a>
        </div>
      </li>
    );

    return (
      /*
            <div style={{fontFamily: "Roboto"}}>
                
                <Row>
                    <Col span={3}>
                        <a>
                            <img src={logo} style={{width: 100, marginTop: 20, marginLeft: 10}} onClick={this.handleHome}></img>
                        </a>
                    </Col>
                    <Col span={21}>
                        {this.props.isLoggedIn ? mypageButton : joinButton}              
                    </Col>
                </Row>
            </div>
             */
      <nav
        className="navbar navbar-expand-lg navbar-dark navbar-custom top-nav-collapse"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "0.5rem 1.5rem 0.5rem 2rem",
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
              {this.props.isLoggedIn ? mypageButton : joinButton}
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
