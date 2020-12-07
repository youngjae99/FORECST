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
import PropTypes from "prop-types";
import { db,storage } from "../firebase";
import {backend_Voting} from "../backend";
import { GithubOutlined } from "@ant-design/icons";


const { Title } = Typography;

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
    this.state={
      projects: [],
      userName: "",
      value: 0,
      visible: false
    }
  }

  state = {
    showresult: 0,
  };

  onChange = (e) => {
    console.log("radio checked", e.target.value);
    this.setState({
      value: e.target.value,
    });
    console.log(this.state.value);
  };
  getTime = async () => {
    await db.collection("Timer").doc("time")
    .onSnapshot({
      includeMetadataChanges: true
    },(snapshot) => {
      if (snapshot.data().timer==1607509290000)    
        this.setState({ visible: true });
    });
  };

  onValue = () => {
    this.setState({
      value: 1,
    })
  }

  componentWillMount(){
    this.getProject();
  }

  getProject = async () => {
    const snapshot = await db.collection("Projects").get();
    console.log(snapshot.docs.map((doc)=>(doc.data())));
    setTimeout(()=>{
      this.setState({projects: snapshot.docs.map((doc)=>(doc.data()))})
    },100);
  }

  votebtnclick = () => {
    console.log("vote button clicked!");
    console.log(this.state.value)
    // backend_Voting(this.state.value);
    this.props.voteRequest();
    setTimeout(()=>{
      this.setState({showresult:1});
    },100);
    console.log(this.showresult);
  };


  render() {
    if(this.state.visible){
    const radioStyle = {
      display: "block",
      height: "30px",
      lineHeight: "30px",
    };
    const { value } = this.state;

    const map1 = this.state.projects.map((word) => <Panel header={word.projectTitle+ ' By '+ word.id}>
                                                      <div style={{marginBottom: 6}}> 
                                                        - <GithubOutlined /> Github URL: <a href={word.githuburl} target="_blank">{word.githuburl}</a>
                                                      </div>
                                                      <div style={{marginBottom: 6}}>
                                                        - Representative Screenshot: 
                                                      </div>
                                                      <div style={{marginBottom: 6}}>
                                                        <img src={word.photo} style={{height:380, width:380}}></img>
                                                      </div>
                                                      <div> 
                                                        - About the Project: {word.description}
                                                      </div>
                                                    </Panel>)
    const map2 = this.state.projects.map((word) => <Radio style={radioStyle} value={word.num}>{word.projectTitle}</Radio>)

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
          <div style={{fontSize: 30, fontWeight: "bold", width: "100%"}}>
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
              {map1}
            </Collapse>
          </Col>
          <Col style={{ width: "30%", padding: 20, backgroundColor: "white" }}>
            <Title level={3}>Vote your pick</Title>
            <Radio.Group onChange={this.onChange} value={value}>
              {map2}
            </Radio.Group>
            <Col>
              <div style={{float: "right", marginTop: 10}}>
                <Button type="primary" onClick={this.votebtnclick}>
                  Submit
                </Button>
              </div>
            </Col>
          </Col>
        </Row>
      </div>
      );
    }
    
  }
  else{
    return(
      <div></div>
    );
  }
}
}

CampRank.propTypes={
  userName: PropTypes.string,
};

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
