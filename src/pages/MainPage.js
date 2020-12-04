import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Typography } from "antd";
import "./MainPage.css";

import "./template/css/style.css";
import "./template/css/swiper.css";
import "./template/css/maginific-popup.css";
import "./template/css/boostrap.css";
import "./template/css/fontawesome-all.css";



const { Title } = Typography;

class MainPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const joinPage = (
      <div className="banner">
        <header id="header" class="header">
          <div class="header-content">
            <div class="container">
              <div class="row">
                <div class="col-lg-6">
                  <div class="text-container">
                    <h1>
                      <span class="turquoise">StartUp Landing</span> Page
                      Template Free
                    </h1>
                    <p class="p-large">
                      Use Evolo free landing page template to promote your
                      business startup and generate leads for the offered
                      services
                    </p>
                    <a class="btn-solid-lg page-scroll" href="#services">
                      DISCOVER
                    </a>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="image-container">
                    <img
                      class="img-fluid"
                      src="images/header-teamwork.svg"
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
      <div className="banner">
        <div className="bannerTitle">
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
