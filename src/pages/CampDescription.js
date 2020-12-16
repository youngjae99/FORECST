import React from "react";
import { connect } from "react-redux";
import "./MainPage.css";

import "./template/css/styles.css";
import "./template/css/swiper.css";
import "./template/css/magnific-popup.css";
import "./template/css/bootstrap.css";
import "./template/css/fontawesome-all.css";
import mainimage from "./template/images/camp1.png";
import {Link} from 'react-router-dom';


class CampDescription extends React.Component {
  constructor(props) {
    super(props);
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
                      <span className="primaryColor" style={{fontSize: 40, color: "#482482"}}> Welcome to Hackathon: </span>
                      <br></br> Make an python crawling application for the Movie!
                    </h1>
                    <p className="p-large">
                      On 12/16~12/20, you are going to make a python application to crawl any data from NAVER movie(https://movie.naver.com/) or IMDB(https://www.imdb.com/)
                      use any tools you want.
                      <br/> <br/>
                      Web scraping, often called web crawling or web spidering, or “programmatically going over a collection of web pages and extracting data,” is a powerful tool for working with data on the web.
                    </p>
                    <Link className="btn-solid-lg page-scroll" to="/tutorial" style={{backgroundColor: "#482482", borderColor: "#482482"}}>
                      NEXT
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

export default connect(mapStateToProps, mapDispatchToProps)(CampDescription);
