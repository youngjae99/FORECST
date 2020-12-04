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

class Explore extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const joinPage = (
        <div id="services" class="cards-1">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12" style={{ padding: "85px 0 125px"}}>
                        <h2>Explore Live Online Hackathons</h2>
                        <p class="p-heading p-large">Learn live with the world's programmers
                        all without leaving home</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-12">
                        <div class="card">
                            <img class="card-image" src="images/services-icon-1.svg" alt="alternative"/>
                            <div class="card-body">
                                <h4 class="card-title">Market Analysis</h4>
                                <p>Our team of enthusiastic marketers will analyse and evaluate how your company stacks against the closest competitors</p>
                            </div>
                        </div>
    
                        <div class="card">
                            <img class="card-image" src="images/services-icon-2.svg" alt="alternative"/>
                            <div class="card-body">
                                <h4 class="card-title">Opportunity Scan</h4>
                                <p>Once the market analysis process is completed our staff will search for opportunities that are in reach</p>
                            </div>
                        </div>
    
                        <div class="card">
                            <img class="card-image" src="images/services-icon-3.svg" alt="alternative"/>
                            <div class="card-body">
                                <h4 class="card-title">Action Plan</h4>
                                <p>With all the information in place you will be presented with an action plan that your company needs to follow</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    );

    return (
      <div style={{ fontFamily: "Roboto" }}>
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

export default connect(mapStateToProps, mapDispatchToProps)(Explore);
