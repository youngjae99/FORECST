import React, { Component } from "react";
import { Radio, Button, Collapse, Row, Col, Typography } from "antd";
import {voteRequest} from '../actions/authentication';
import {connect} from 'react-redux';

const { Title } = Typography;

const text = `
I had made an application that shows the number of people in a cafe. 
Due to COVID 19, people are finding places where there are less people, 
for there safety. To help these people, I thought that letting people 
know how much people there are would be very helpful for people these days.
`;

const { Panel } = Collapse;

function callback(key) {
  console.log(key);
}

class CampRankVote extends Component {
  state = {
    value: 1
  };

  constructor(props) {
    super(props);
    this.votebtnclick = this.votebtnclick.bind(this);
  }

  votebtnclick = () => {
    console.log("vote button clicked!");
    this.props.voteRequest();
    // this.props.history.push('/camp');
    // console.log("vote status: ", this.props.status);
    console.log("vote status: ", this.props.status.isVoted);
    // console.log("vote status: ", this.props.status.isLoggedIn);
  };

  onChange = (e) => {
    console.log("radio checked", e.target.value);
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    const radioStyle = {
      display: "block",
      height: "30px",
      lineHeight: "30px",
    };
    const { value } = this.state;

    return (
      <div></div>
    );
  }
}

const mapStateToProps=(state)=>{
    return{
        status: state.authentication.status
    };
};

const mapDispatchToProps=(dispatch)=>{    
    return{
        voteRequest: ()=>{
            return dispatch(voteRequest());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CampRankVote);
