import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Typography, Card, Col, Row} from "antd";
import "./MainPage.css";

import "./template/css/styles.css";
import "./template/css/swiper.css";
import "./template/css/magnific-popup.css";
import "./template/css/bootstrap.css";
import "./template/css/fontawesome-all.css";
import mainimage from "./template/images/Programming-pana.svg";
import { db } from "../firebase";

const { Title } = Typography;

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state={new:false}
  }

  componentWillMount() {
    const id = window.sessionStorage.getItem("id");
    console.log("mount id", id);
    this.getNewbie()

    if (id) {
      console.log("true");
      this.setState({
        logged: true,
        isLoggedIn: true,
        currentUser: id,
      });
    }
  }
  getNewbie = async()=>{
    if(window.sessionStorage.getItem("id")){
      console.log(window.sessionStorage.getItem("id"))
      const newbie = await db.collection("Users").doc(window.sessionStorage.getItem("id")).get()
      console.log(newbie.data().newbie)

      this.setState({new:newbie.data().newbie})
    }
  }


  render() {

    const joinPage = (
      <div className="banner" style={{ fontFamily: "Roboto" }}>
        <link
          href="https://fonts.googleapis.com/css?family=Raleway:400,400i,600,700,700i&amp;subset=latin-ext"
          rel="stylesheet"
        ></link>
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
                      Online Hackathon platform that makes you get motivation to
                      finish the project, and freely share your coding
                      experiences.
                    </p>
                    <Link className="btn-solid-lg page-scroll" to="/explore">
                      EXPLORE
                    </Link>
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

      /*
      <div className="header-content">
        <div className="container">
          <div
            className="banner"
            style={{
              width: "100%",
              paddingRight: "15px",
              paddingLeft: "15px",
              marginRight: "auto",
              marginLeft: "auto",
            }}
          >
            <div
              className="bannerTitle"
              style={{
                maxWidth: "1230px",
                paddingRight: "auto",
                paddingLeft: "auto",
              }}
            >
              <Title>
                FORECST is the online community where everyone codes and do
                their own project together
              </Title>
              <div>
                <Title level={3} style={{ marginBottom: "20" }}>
                  Get motivation to finish the project, and freely share your
                  coding experiences.
                </Title>

                <div>
                  <Title level={5} style={{ display: "block", fontSize: 18 }}>
                    1. Make an application for the pandemic COVID 19 situation!
                    (11/24~12/1)
                    <Button type="primary" style={{ marginLeft: "16px" }}>
                      <Link to={"/campdescription"} style={{ fontSize: 18 }}>
                        Enter Hackathon
                      </Link>
                    </Button>
                  </Title>
                  <Title
                    level={5}
                    style={{
                      display: "block",
                      marginRight: "16px",
                      fontSize: 18,
                    }}
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
                    style={{
                      display: "block",
                      marginRight: "16px",
                      fontSize: 18,
                    }}
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
                    style={{
                      display: "block",
                      marginRight: "16px",
                      fontSize: 18,
                    }}
                  >
                    4. Design a service that helps children to concentrate
                    easily on their studying! (11/21~12/8)
                    <Button type="primary" style={{ marginLeft: "16px" }}>
                      {}
                      <div style={{ fontSize: 18 }}>Enter Hackathon</div>
                      {}
                    </Button>
                  </Title>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      */
     <div className="banner" style={{ fontFamily: "Roboto" }}>
        <link
          href="https://fonts.googleapis.com/css?family=Raleway:400,400i,600,700,700i&amp;subset=latin-ext"
          rel="stylesheet"
        ></link>
        <header id="header" className="header">
          <div className="header-content">
            <div className="container">
              <div className="row">
                <div className="col-lg-6">
                  <div className="text-container">
                    <h1>
                      Join the hackathon right now
                    </h1>
                    <p className="p-large">
                      There are many hackathons waiting for you here.
                    </p>
                    
                  </div>
                  
                </div>
                
              </div>

              <div className="site-card-wrapper" style={{marginTop:"40px"}}>
                <Row className="camp-row" gutter={16}>
                  <Col span={8}>
                    <Card title="12/16 ~ 12/20" extra={<Button danger>{this.state.new?<Link to={"/campdescription"} className="nowOn">JOIN NOW</Link>:<Link to={"/camp"} className="nowOn">ENTER NOW</Link>}</Button>} style={{ width: 300 }}>
                    <h6>Make an python crawling application for the Movie!
                    (12/16 ~ 12/20)</h6>
                    <p style={{color:"red", fontWeight:"bold"}}>Now on going!</p>
                  </Card>
                  </Col>
                  <Col span={8}>
                  <Card title="12/21~25" extra={<Button danger disabled><Link to={"/camp"} className="nowOn">ENTER NOW</Link></Button>} style={{ width: 300 }}>
                    <h6>Create a website using React and Firebase. (Starting from
                    12/11)</h6>
                  </Card>
                  </Col>
                  <Col span={8}>
                  <Card title="12/25 ~" extra={<Button danger disabled><Link to={"/camp"} className="nowOn">ENTER NOW</Link></Button>} style={{ width: 300 }}>
                    <h6>Come up with a platform for people who live alone in the
                    city. (Starting from 12/25)</h6>
                  </Card>
                  </Col>
                </Row>

                <Row className="camp-row" gutter={16}>
                  <Col span={8}>
                  <Card title="12/26 ~ " extra={<Button danger disabled><Link to={"/camp"} className="nowOn">ENTER NOW</Link></Button>} style={{ width: 300 }}>
                    <h6>Design a service that helps children to concentrate
                    easily on their studying! (12/26)</h6>
                  </Card>
                  </Col>
                </Row>
              </div>
              
            </div>
            
          </div>
          
        </header>
        
      </div>
    );

    console.log(this.props.status);

    return (
      <div style={{ fontFamily: "Roboto", paddingTop: "10px" }}>
        {window.sessionStorage.getItem("id") ? goCampPage : joinPage}
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
