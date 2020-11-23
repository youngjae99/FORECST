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

  render() {
    const radioStyle = {
      display: "block",
      height: "30px",
      lineHeight: "30px",
    };
    const { value } = this.state;

    return (
      
    );
  }
}

export default CampRank;
