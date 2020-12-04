import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Typography } from "antd";
import "./MainPage.css";

import "./template/css/styles.css";
import "./template/css/swiper.css";
import "./template/css/magnific-popup.css";
import "./template/css/bootstrap.css";
import "./template/css/fontawesome-all.css";
import mainimage from './template/images/Programming-pana.svg';


const { Title } = Typography;

class MainPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const joinPage = (
      <div className="banner" style={{fontFamily: "Roboto"}}>
        <link href="https://fonts.googleapis.com/css?family=Raleway:400,400i,600,700,700i&amp;subset=latin-ext" rel="stylesheet"></link>
        <header id="header" className="header">
          <div className="header-content">
            <div className="container">
              <div className="row">
                <div className="col-lg-6">
                  <div className="text-container">
                    <h1>
                      <span className="primaryColor"> Idea into Reality </span> 
                       Code and Learn, <br></br>Do your own project with others.
                    </h1>
                    <p className="p-large">
                    Online Hackathon platform that makes you get motivation to finish the project, and freely share your coding
                    experiences.
                    </p>
                    <a className="btn-solid-lg page-scroll" href="/explore">
                      EXPLORE
                    </a>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="image-container">
                    <img
                      className="img-fluid"
                      src={mainimage}
                      alt="alternative"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
    );

    const goCampPage = (
      <div className="banner" style={{padding:"30px"}}>
        <div className="bannerTitle" style={{maxWidth:"1230px", paddingRight:"auto", paddingLeft:"auto"}}>
          <Title>
            FORECST is the online community where everyone codes and do their
            own project together
          </Title>
          <div>
            <Title level={3} style={{ marginBottom: "20" }}>
              Get motivation to finish the project, and freely share your coding
              experiences.
            </Title>

            <div>
              <Title level={5} style={{ display: "block", fontSize: 18 }}>
                1. Make an application for the pandemic COVID 19 situation!
                (11/24~12/1)
                <Button type="primary" style={{ marginLeft: "16px" }}>
                  <Link to={"/camp"} style={{ fontSize: 18 }}>
                    Enter Hackathon
                  </Link>
                </Button>
              </Title>
              <Title
                level={5}
                style={{ display: "block", marginRight: "16px", fontSize: 18 }}
              >
                2. Create a website using React and Firebase. (Starting from
                12/4)
                <Button disabled style={{ marginLeft: "16px" }}>
                  <Link to={"/camp"}>
                    <div style={{ fontSize: 18 }}>Enter Hackathon</div>
                  </Link>
                </Button>
              </Title>
              <Title
                level={5}
                style={{ display: "block", marginRight: "16px", fontSize: 18 }}
              >
                3. Come up with a platform for people who live alone in the
                city. (Starting from 12/10)
                <Button disabled style={{ marginLeft: "16px" }}>
                  <Link to={"/camp"} style={{ fontSize: 18 }}>
                    Enter Hackathon
                  </Link>
                </Button>
              </Title>
              <Title
                level={5}
                style={{ display: "block", marginRight: "16px", fontSize: 18 }}
              >
                4. Design a service that helps children to concentrate easily on
                their studying! (11/21~12/8)
                <Button type="primary" style={{ marginLeft: "16px" }}>
                  {/* <Link to={"/camp"} style={{ fontSize: 18 }}> */}
                  <div style={{ fontSize: 18 }}>Enter Hackathon</div>
                  {/* </Link> */}
                </Button>
              </Title>
            </div>
          </div>
        </div>
      </div>
    );

    console.log(this.props.status);

    return (
      <div style={{ fontFamily: "Roboto" }}>
        {this.props.status.isLoggedIn ? goCampPage : joinPage}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.authentication.status,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
