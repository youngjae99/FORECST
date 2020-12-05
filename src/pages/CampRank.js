import React, { Component } from "react";
import {
  Radio,
  Button,
  notification,
  Collapse,
  Row,
  Col,
  Typography,
} from "antd";
// import { Menu} from '../components';
import { Link } from "react-router-dom";
import CampRankVote from './CampRankVote';
import CampRankResult from './CampRankResult';
import {connect} from 'react-redux';
import {voteRequest} from '../actions/authentication';



const { Title } = Typography;

const text = `
I had made an application that shows the number of people in a cafe. 
Due to COVID 19, people are finding places where there are less people, 
for there safety. To help these people, I thought that letting people 
know how much people there are would be very helpful for people these days.
`;

const close = () => {
  console.log(
    "Notification was closed. Either the close button was clicked or duration time elapsed."
  );
};

const openNotification = () => {
  const key = `open${Date.now()}`;
  const btn = (
    <Button type="primary" size="small" onClick={() => notification.close(key)}>
      OK
    </Button>
  );
  notification.open({
    message: "Ranking poll result",
    description: "Your choice is successfully count in the result!",
    btn,
    placement: "bottomLeft",
    bottom: 300,
    key,
    onClose: close,
  });
};

const { Panel } = Collapse;

function callback(key) {
  console.log(key);
}

class CampRank extends Component {
  constructor(props) {
    super(props);
    this.votebtnclick = this.votebtnclick.bind(this);
  }

  state = {
    value: 1,
    showresult: 0,
  };

  onChange = (e) => {
    console.log("radio checked", e.target.value);
    this.setState({
      value: e.target.value,
    });
  };

  votebtnclick = () => {
    console.log("vote button clicked!");
    this.props.voteRequest();
    setTimeout(()=>{
      this.setState({showresult:1});
    },100);
    console.log(this.showresult);
  };

  render() {
    const radioStyle = {
      display: "block",
      height: "30px",
      lineHeight: "30px",
    };
    const { value } = this.state;

    const voted=(
      <div>voted</div>
    )
    
    const not=(
      <div>not voted</div>
    )

    console.log("isVoted:",this.props.status.isVoted);
    if(this.props.status.isVoted){
      return (
        <div>
          <CampRankResult></CampRankResult>
        </div>
      );
    }
    else{
      return (
        <div style={{ padding: 20, fontStyle: "Roboto", paddingTop: 10, paddingBottom: 140}}>
        <Row>
          <div style={{fontSize: 30, fontWeight: "bold"}}>
            Poll for the Final Ranking!
          </div>
          <div style={{fontSize: 16, paddingBottom: 10}}>
            Read the description for each project carefully, and choose the one
            that you think is the best!
          </div>
        </Row>
        <Row>
          <Col
            style={{
              width: "65%",
              padding: 20,
              marginRight: 10,
              backgroundColor: "white",
            }}
          >
            <Title level={3}>Project List</Title>
            <Collapse onChange={callback}>
              <Panel header="Project A" key="1">
                <p>{text}</p>
              </Panel>
              <Panel header="Project B" key="2">
                <p>{text}</p>
              </Panel>
              <Panel header="Project C" key="3">
                <p>{text}</p>
              </Panel>
              <Panel header="Project D" key="4">
                <p>{text}</p>
              </Panel>
              <Panel header="Project E" key="5">
                <p>{text}</p>
              </Panel>
              <Panel header="Project F" key="6">
                <p>{text}</p>
              </Panel>
              <Panel header="Project G" key="7">
                <p>{text}</p>
              </Panel>
              <Panel header="Project H" key="8">
                <p>{text}</p>
              </Panel>
              <Panel header="Project I" key="9">
                <p>{text}</p>
              </Panel>
              <Panel header="Project J" key="10">
                <p>{text}</p>
              </Panel>
            </Collapse>
          </Col>
          <Col style={{ width: "30%", padding: 20, backgroundColor: "white" }}>
            <Title level={3}>Vote your pick</Title>
            <Radio.Group onChange={this.onChange} value={value}>
              <Radio style={radioStyle} value={1}>
                Project A
              </Radio>
              <Radio style={radioStyle} value={2}>
                Project B
              </Radio>
              <Radio style={radioStyle} value={3}>
                Project C
              </Radio>
              <Radio style={radioStyle} value={4}>
                Project D
              </Radio>
              <Radio style={radioStyle} value={5}>
                Project E
              </Radio>
              <Radio style={radioStyle} value={6}>
                Project F
              </Radio>
              <Radio style={radioStyle} value={7}>
                Project G
              </Radio>
              <Radio style={radioStyle} value={8}>
                Project H
              </Radio>
              <Radio style={radioStyle} value={9}>
                Project I
              </Radio>
              <Radio style={radioStyle} value={10}>
                Project J
              </Radio>
            </Radio.Group>
            <Col>
              <Button type="primary" onClick={this.votebtnclick}>
                Submit
              </Button>
            </Col>
          </Col>
        </Row>
      </div>
      );
    }
    
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

export default connect(mapStateToProps, mapDispatchToProps)(CampRank);
