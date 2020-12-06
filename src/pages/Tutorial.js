import React from "react";
import { connect } from "react-redux";
import { Button, Modal } from "antd";
import "./MainPage.css";

import "./template/css/styles.css";
import "./template/css/swiper.css";
import "./template/css/magnific-popup.css";
import "./template/css/bootstrap.css";
import "./template/css/fontawesome-all.css";

class Tutorial extends React.Component {

  constructor(props) {
    super(props);
    this.state={};
  }

  handleOk=()=>{
    console.log(this.props.history);

    this.props.history.push(`/mypage/${window.sessionStorage.getItem("id")}`);
    Modal.destroyAll();
  }

  handleStart=()=>{
    Modal.info({
        title: "Now, we are going to start by writing a to-do list.",
        content: (
            <div>
                Your first to-do list must be 'Making a project name'
                <div style={{float: "right", marginTop: 20}}>
                    <Button type="primary" onClick={this.handleOk}>
                        START
                    </Button>
                </div>
            </div>  
        ),
        width: 500,
        centered: true,
        okButtonProps: {style: {display: "none"}},
        onCancel(){}
      });
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
                  <div className="text-container">
                    <h1 style={{fontSize: 35}}>
                      <span className="primaryColor" style={{fontSize: 50, color: "#482482", fontWeight: "bold"}}> In this Hackathon, </span>
                      <br></br> You can write a to-do list and post a feed if you complete it,
                      <br></br> Ask questions freely,
                      <br></br> And submit your project and vote for the final ranking.
                      <br></br> 
                      <span className="primaryColor" style={{fontSize: 35, color: "#482482"}}>You can grow your tree by participating actively.</span>
                    </h1>
                    <p className="p-large">
                      You will get a prize either if you win final ranking, or if your tree level is highest.
                      <br></br> Now, let's start by writing a to-do list, and do first posting.
                    </p>
                    <a className="btn-solid-lg page-scroll"
                    style={{backgroundColor: "#482482", borderColor: "#482482", color: "white"}}
                    onClick={this.handleStart}>
                        START
                    </a>
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
    );

    return (
      <div style={{ fontFamily: "Roboto", paddingTop: "10px" }}>
        {joinPage}
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

export default connect(mapStateToProps, mapDispatchToProps)(Tutorial);
