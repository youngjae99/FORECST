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

const votebtnclick = () => {
    console.log("vote button clicked!");
    this.setState({
        showresult: 1;
    })
}

const { Panel } = Collapse;

function callback(key) {
  console.log(key);
}

class CampRankVote extends Component {
  state = {
    value: 1,
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
      <div style={{padding:20}}>
        <Row>
          <Title>Poll for the Final Ranking!</Title>
          <Title level={4}>
              Read the description for each project carefully, and choose the
              one that you think is the best!
          </Title>
        </Row>
        <Row>
          <Col style={{width:"65%", padding:20, marginRight:10, backgroundColor:"white"}}>
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
          <Col style={{width:"30%", padding:20, backgroundColor:"white"}}>
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
                <Button type="primary" onClick={votebtnclick}>
                    Submit
                </Button>
            </Col>
          </Col>
        </Row>
      </div>
    );
  }
}

export default CampRankVote;
