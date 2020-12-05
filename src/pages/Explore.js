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
import icon1 from "./template/images/services-icon-1.svg";
import icon2 from "./template/images/services-icon-2.svg";
import icon3 from "./template/images/services-icon-3.svg";


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
                    <div class="col-lg-12" style={{ padding: "85px 0 20px"}}>
                        <h2>Explore Live Online Hackathons</h2>
                        <p class="p-heading p-large">Learn live with the world's programmers
                        all without leaving home</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-12">
                        <div class="card">
                            <img class="card-image" src={icon1} alt="alternative"/>
                            <div class="card-body">
                                <h4 class="card-title">Discussion</h4>
                                <p>Share what's happening with other participants at the Hackathon, answer questions, solve problems you couldn't solve alone, and achieve your goals</p>
                            </div>
                        </div>
    
                        <div class="card">
                            <img class="card-image" src={icon2} alt="alternative"/>
                            <div class="card-body">
                                <h4 class="card-title">Acheivement</h4>
                                <p>By participating in the hackathon, you will create specific apps and web services in a short period of time, and your skills will improve a lot in the process</p>
                            </div>
                        </div>
    
                        <div class="card">
                            <img class="card-image" src={icon3} alt="alternative"/>
                            <div class="card-body">
                                <h4 class="card-title">Competition</h4>
                                <p>Compete against others and keep running without losing your goals! At the end of the hackathon, the best works are selected and awarded through voting</p>
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
