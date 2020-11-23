import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Typography } from "antd";
import "./MainPage.css";
const { Title } = Typography;

class MainPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const joinPage = (
      <div className="banner">
        <div className="bannerTitle">
          <Title>
            FORECST is the online community where everyone codes and do their own project together
          </Title>
          <div>
            <Title level={4}>
            Get motivation to finish the project, and freely share your coding experiences.
            </Title>
            
            <Button type="primary" size="large">
              <Link to={"/register"} style={{ fontSize: 18 }}>
                Join Now
              </Link>
            </Button>
          </div>
        </div>
        <div className="bannerImgWrap">
          <div style={{ height: "450px", marginBottom: "-304px" }}>
            <img
              src="https://cdn.glitch.com/605e2a51-d45f-4d87-a285-9410ad350515%2Fhomepage-illo-editor.svg?v=1587129125983"
              alt="Glitch code editor"
            />
          </div>
        </div>
      </div>
    );

    const goCampPage = (
      <div className="banner">
        <div className="bannerTitle">
          <Title>
            FORECST is the online community where everyone codes and do their own project together
          </Title>
          <div>
            <Title level={4}>
            Get motivation to finish the project, and freely share your coding experiences.
            </Title>
            
            <div>
            <Title level={4} style={{ display: "block" }}>
            1. Make an application for the pandemic COVID 19 situation!
            <Button type="primary" size="large">
              <Link to={"/camp"} style={{ fontSize: 18 }}>
                Go to Hackathon
              </Link>
            </Button>
            </Title>
            <Title level={4} style={{ display: "block" }}>
            1. Make an application for the pandemic COVID 19 situation!
            <Button type="primary" size="large">
              <Link to={"/camp"} style={{ fontSize: 18 }}>
                Go to Hackathon
              </Link>
            </Button>
            </Title>
            <Title level={4} style={{ display: "block" }}>
            1. Make an application for the pandemic COVID 19 situation!
            <Button type="primary" size="large">
              <Link to={"/camp"} style={{ fontSize: 18 }}>
                Go to Hackathon
              </Link>
            </Button>
            </Title>
            <Title level={4} style={{ display: "block" }}>
            1. Make an application for the pandemic COVID 19 situation!
            <Button type="primary" size="large">
              <Link to={"/camp"} style={{ fontSize: 18 }}>
                Go to Hackathon
              </Link>
            </Button>
            </Title>
          </div>

          </div>
        </div>
        <div className="bannerImgWrap">
          <div style={{ height: "450px", marginBottom: "-304px" }}>
            <img
              src="https://cdn.glitch.com/605e2a51-d45f-4d87-a285-9410ad350515%2Fhomepage-illo-editor.svg?v=1587129125983"
              alt="Glitch code editor"
            />
          </div>
        </div>
        
      </div>



      );

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
