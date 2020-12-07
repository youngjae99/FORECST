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
import Profile from './profile';


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
        Add Answer 
      </Button>
    </Form.Item>
  </>
);

class QnAComment extends Component {
  
  constructor(props){
    super(props);

    this.state = {
      comments: [],
      submitting: false,
      value: '',
      point: 0,
    };    
    console.log(window.sessionStorage.getItem("id"))
  }

  componentDidMount(){
    this.getComments();
    // this.getMarker();
  }

  getComments = async () => {
    const snapshot = await db.collection("QnAList/"+this.props.posting+"/Comments").get()
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
    console.log(window.sessionStorage.getItem("id"))
    this.setState({
      submitting: true,
    });

    setTimeout(() => {
      db.collection('QnAList').doc(this.props.posting).collection("Comments").doc().set({author:window.sessionStorage.getItem("id"), content:this.state.value, datetime:moment().valueOf()})
      this.setState({
        submitting: false,
        value: '',
        comments: [
          {
            author: window.sessionStorage.getItem("id"),
            content: <p>{this.state.value}</p>,
            datetime: moment().fromNow(),
          },
          ...this.state.comments,
        ],
      });
    }, 1000);
  };

  handleChange = e => {
    this.setState({
      value: e.target.value,
    });
  };
  
//   getMarker = async () => {
//     const snapshot = await db.collection('Users').doc(this.props.currentUser).get();
//     console.log(snapshot);
//     this.setState({point:snapshot.data().point});
// }

  // getPoints = async (id) => {
  //   const snapshot = await db.collection("Users").doc(id).get()
  //   // console.log(snapshot.docs.map(doc=>doc.data()))
  //   return snapshot.data().point
  // }

  render() {
    const { comments, submitting, value } = this.state;

    var point=this.state.point;
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
            username={window.sessionStorage.getItem("id")}
          />
        }
        avatar={
          <Profile
            writer={window.sessionStorage.getItem("id")}>
          </Profile>
        }
      />
      </>
    )

    return (
      <>
        <List
            className="comment-list"
            locale={{emptyText: 'No answers yet!'}}
            header={`${comments.length} answers`}
            itemLayout="vertical"
            dataSource={comments}
            renderItem={item => (
                // <li>
                <Comment
                    // actions={item.actions}
                    author={item.author}
                    content={item.content}
                    datetime={item.datetime.fromNow}
                    avatar={
                      <Profile
                        writer={item.author}>
                      </Profile>
                    }
                />
                // {/* {this.getPoints(item.author)} */}
                // </li>
            )}
            />
        {window.sessionStorage.getItem("id")? addComment : null}
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

export default connect(mapStateToProps, mapDispatchToProps)(QnAComment);