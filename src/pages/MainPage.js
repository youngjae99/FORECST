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
            <Title level={3} style={{marginBottom: "20"}}>
            Get motivation to finish the project, and freely share your coding experiences.
            </Title>
            
            <div>
            <Title level={5} style={{ display: "block", fontSize: 18 }}>
            1. Make an application for the pandemic COVID 19 situation! (11/24~12/1)
            <Button type="primary" style={{marginLeft: "16px"}}>
              <Link to={"/camp"} style={{ fontSize: 18 }}>
              Enter Hackathon
              </Link>
            </Button>
            </Title>
            <Title level={5} style={{ display: "block", marginRight: "16px", fontSize: 18 }}>
            2. Create a website using React and Firebase. (Starting from 12/4)
            <Button disabled style={{marginLeft: "16px"}}>
              <Link to={"/camp"}>
                <div style={{ fontSize: 18 }}>Enter Hackathon</div>
              </Link>
            </Button>
            </Title>
            <Title level={5} style={{ display: "block", marginRight: "16px", fontSize: 18  }}>
            3. Come up with a platform for people who live alone in the city. (Starting from 12/10)
            <Button disabled style={{marginLeft: "16px"}}>
              <Link to={"/camp"} style={{ fontSize: 18 }}>
              Enter Hackathon
              </Link>
            </Button>
            </Title>
            <Title level={5} style={{ display: "block", marginRight: "16px", fontSize: 18  }}>
            4. Design a service that helps children to concentrate easily on their studying! (11/21~12/8)
            <Button type="primary" style={{marginLeft: "16px"}}>
              {/* <Link to={"/camp"} style={{ fontSize: 18 }}> */}
                <div style={{fontSize: 18}}>Enter Hackathon</div>
              {/* </Link> */}
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
