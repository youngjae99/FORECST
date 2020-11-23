import React, {Component} from 'react';
import { Comment, Form, Button, List, Input, Tooltip, Avatar, Collapse } from 'antd';
import moment from 'moment';
import { db,storage } from "../firebase";
import {connect} from 'react-redux';
import lv0 from '../level_tree/lv0.png';
import lv1 from '../level_tree/lv1.png';
import lv2 from '../level_tree/lv2.png';
import {getLevel} from '../actions/authentication';
import PropTypes from 'prop-types';
import {backend_Feed_watering} from "../backend";
import watering1 from "../water1.png";
import watering2 from "../water2.png";


const { Panel } = Collapse;

function callback(key) {
  console.log(key);
}

const { TextArea } = Input;
const Editor = ({ onChange, onSubmit, submitting, value, username }) => (
  <>
    <div>{username}</div>
    <Form.Item>
      <Input
      type='text'
      onChange={onChange}
      value={value}
      style={{height: 50}}>
      </Input>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} 
      type="primary" style={{marginTop: 10, float: "right"}}>
        Add Comment 
      </Button>
    </Form.Item>
  </>
);

class FeedComment extends Component {
  
  constructor(props){
    super(props);

  this.state = {
    comments: [],
    submitting: false,
    value: '',
    watered : 1
  };    
  console.log(this.props.status.currentUser)
}
  componentDidMount(){
    this.getComments()
  }
  getComments = async () => {
    const snapshot = await db.collection("Feeds/"+this.props.posting+"/Comments").get()
    console.log(snapshot.docs.map(doc=>doc.data()))
        this.setState({comments:snapshot.docs.map(doc=>doc.data())})  
    }
    getPoints = async (id) => {
      const snapshot = await db.collection("Users").doc(id).get()
      console.log(snapshot.docs.map(doc=>doc.data()))
      return snapshot.data().point
    }
  

  handleSubmit = () => {
    if (!this.state.value) {
      return;
    }
    console.log(this.props.status.currentUser)
    this.setState({
      submitting: true,
    });

    setTimeout(() => {
      db.collection('Feeds').doc(this.props.posting).collection("Comments").doc().set({author:this.props.status.currentUser,content:this.state.value,datetime:moment().valueOf()})
      this.setState({
        submitting: false,
        value: '',
        comments: [
          {
            author: this.props.status.currentUser,
            content: <p>{this.state.value}</p>,
            datetime: moment().fromNow(),
          },
          ...this.state.comments,
        ],
      });
    }, 1000);
  };

  handleWatering = e => {
    if(this.state.watered == 1){
      backend_Feed_watering(this.props.posting,this.props.id)
      setTimeout(()=>{
        this.setState({watered:2})
      },100);
    }
  }
  handleChange = e => {
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    const watering =() =>{
      if (this.state.watered ==1){
        return watering1
      }
      else
        return watering2
    }
    const { comments, submitting, value } = this.state;

    // var point=this.state.point;
    var point=0;
    const level=this.props.getLevel(point);
    let profileTree=null;

    switch (level) {
        case 1:
            profileTree=<img src={lv1}></img>
            break;
        case 2:
            profileTree=<img src={lv2}></img>
            break;
        default:
            profileTree=<img src={lv0}></img>
            break;
    }

    const addComment=(
      <>
      <Comment
        content={
          <Editor
            onChange={this.handleChange}
            onSubmit={this.handleSubmit}
            submitting={submitting}
            value={value}
            username={this.props.status.currentUser}
          />
        }
        avatar={
          <Avatar
          icon={profileTree}
          />
        }
      />
      </>
    )

    return (
      <>
        <Button onClick={this.handleWatering} style={{float: "right"}}><img src={watering()} alt ="wc" style={{width:"30px", height:"30px"}}/></Button>
        <List
            className="comment-list"
            header={`${comments.length} replies`}
            itemLayout="horizontal"
            dataSource={comments}
            renderItem={item => (
                <li>
                <Comment
                    // actions={item.actions}
                    author={item.author}
                    content={item.content}
                    datetime={item.datetime}
                    avatar={
                      <Avatar
                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                        alt="Han Solo"
                      />
                    }
                />
                </li>
            )}
            />
        {this.props.status.isLoggedIn ? addComment : null}
      </>
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
        getLevel: (point)=>{
            return getLevel(point);
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedComment);
