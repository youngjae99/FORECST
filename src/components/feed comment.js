import React, {Component} from 'react';
import { Comment, Form, Button, List, Input, Space, Spin} from 'antd';
import moment from 'moment';
import { db } from "../firebase";
import {connect} from 'react-redux';
import {getLevel} from '../actions/authentication';
import {backend_Feed_watering} from "../backend";
import watering1 from "../water1.png";
import watering2 from "../water2.png";
import { MessageOutlined } from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroller';
import './feedcomment.css';
import Profile from './profile';

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
      watered : 1,
      point: 0,
    };    
    console.log(this.props.status.currentUser)
  }

  componentDidMount(){
    this.getComments();
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
    const IconText = ({ icon, text }) => (
      <Space>
          {React.createElement(icon)}
          {text}
      </Space>
      );

    const watering =() =>{
      if (this.state.watered ==1){
        return watering1
      }
      else
        return watering2
    }

    const { comments, submitting, value } = this.state;

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
          <Profile
            writer={this.props.status.currentUser}>
          </Profile>
        }
      />
      </>
    )

    return (
      <div className="demo-infinite-container">
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={this.handleInfiniteOnLoad}
          hasMore={!this.state.loading && this.state.hasMore}
          useWindow={false}
        >
          <List
            className="comment-list"
            header={
              <div>
                <a onClick={this.handleWatering} style={{float: "right"}}>
                  <img src={watering()} alt ="wc" style={{width:"25px", height:"25px"}}/>
                </a>
                <IconText icon={MessageOutlined} text={comments.length} key="list-vertical-message" />
              </div>
            }
            itemLayout="horizontal"
            dataSource={comments}
            renderItem={item => (
                <li>
                <Comment
                    author={item.author}
                    content={item.content}
                    datetime={item.datetime}
                    avatar={
                    <Profile
                      writer={item.author}>
                    </Profile>
                    }
                />
                </li>
            )}
          >

          {this.state.loading && this.state.hasMore && (
            <div className="demo-loading-container">
              <Spin />
            </div>
          )}
          </List>

          {this.props.status.isLoggedIn ? addComment : null}
        </InfiniteScroll>
      </div>
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
