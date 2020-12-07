import React, { Component } from "react";
import {
  Comment,
  Form,
  Button,
  List,
  Input,
  Space,
  Spin,
  Popconfirm,
  message,
  Modal
} from "antd";
import moment from "moment";
import { db } from "../firebase";
import { connect } from "react-redux";
import { getLevel } from "../actions/authentication";
import { backend_Feed_watering,backend_Point } from "../backend";
import watering0 from "../watericon0.png";
import watering1 from "../watericon1.png";
import popup_water from "../popup_water.jpg";

import { MessageOutlined } from "@ant-design/icons";
import InfiniteScroll from "react-infinite-scroller";
import "./feedcomment.css";
import Profile from "./profile";

const count = 1;

const Editor = ({ onChange, onSubmit, submitting, value, username }) => (
  <>
    <div>{username}</div>
    <Form.Item>
      <Input
        type="text"
        onChange={onChange}
        value={value}
        style={{ height: 50 }}
      ></Input>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
        style={{ marginTop: 10, float: "right" }}
      >
        Add Comment
      </Button>
    </Form.Item>
  </>
);

class QnAComment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      submitting: false,
      value: "",
      watered: 0,
      point: 0,
      initLoading: true,
      loading: false,
      comments: [],
      list: [],
      modal_visible:false,
    };
    console.log(window.sessionStorage.getItem("id"));
  }
  componentDidMount(){
    this.getComments();
  }
  componentDidUpdate(prevProps) {
    // 전형적인 사용 사례 (props 비교를 잊지 마세요)
    console.log(prevProps.posting)
    if (this.props.posting !== prevProps.posting) {
      console.log("change");
      this.getComments();
    }
  }
  getComments = async () => {
    console.log(this.props.posting)
    const snapshot = await db
      .collection("QnAList/" + this.props.posting + "/Comments")
      .orderBy("datetime")
      .get();
    console.log(snapshot.docs.map((doc) => doc.data()));
    this.setState({
      list: [],
    });
    this.setState({
      comments: snapshot.docs.map((doc) => doc.data()),
      initLoading: false,
    });

    if (this.state.comments.length > 0 && this.state.list.length < 1) {
      this.setState({
        list: this.state.comments.slice(0, 1),
      });
    }

    console.log("loaded comment: ", this.comments);
  };

  handleSubmit = () => {
    if (!this.state.value) {
      return;
    }
    console.log(window.sessionStorage.getItem("id"));
    this.setState({
      submitting: true,
    });

    setTimeout(() => {
      backend_Point(window.sessionStorage.getItem("id"),"comment")
      db.collection("QnAList")
        .doc(this.props.posting)
        .collection("Comments")
        .doc()
        .set({
          author: window.sessionStorage.getItem("id"),
          content: this.state.value,
          datetime: moment().valueOf(),
        });
      this.setState({
        submitting: false,
        value: "",
        comments: [
          ...this.state.comments,
          {
            author: window.sessionStorage.getItem("id"),
            content: <p>{this.state.value}</p>,
            datetime: moment().fromNow(),
          },
        ],
      });
      this.getComments();
    }, 1000);
  };

  handleChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };
  handleOk = () => {
    setTimeout(() => {
      this.setState({ modal_visible:false });
    }, 100);
  };


  onLoadMore = () => {
    const data = this.state.list;
    const cur_len = this.state.list.length;

    console.log("data", data);
    this.setState(
      {
        list: (
          JSON.parse(JSON.stringify(this.state.comments))
        ),
        loading: false,
      },
      () => {
        // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
        // In real scene, you can using public method of react-virtualized:
        // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
        window.dispatchEvent(new Event("resize"));
      }
    );
    console.log("loadmore----comments : ", this.state.comments);
    console.log("loadmore----list : ", this.state.list);
    console.log("loadmore----data? : ", this.state.data);
  };

  render() {
    const IconText = ({ icon, text }) => (
      <Space>
        {React.createElement(icon)}
        {text}
      </Space>
    );

    const {
      list,
      submitting,
      value,
      initLoading,
      loading,
      comments,
    } = this.state;

    const addComment = (
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
          avatar={<Profile writer={window.sessionStorage.getItem("id")}></Profile>}
        />
      </>
    );

    const loadMore =
      !initLoading && !loading ? (
        <div
          style={{
            textAlign: "right",
          }}
        >
          <a onClick={this.onLoadMore} style={{color:"#007bff"}}>see {this.state.comments.length-1} more answers</a>
        </div>
      ) : null;

    return (
      <div>
        <List
          className="comment-list"
          locale={{emptyText: 'No comments yet!'}}
          loading={initLoading}
          itemLayout="horizontal"
          loadMore={comments.length > list.length ? loadMore : null}
          dataSource={list}
          renderItem={(item) => (
            <li>
              <Comment
                author={item.author}
                content={item.content}
                datetime={item.datetime.fromNow}
                avatar={<Profile writer={item.author}></Profile>}
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

        {window.sessionStorage.getItem("id") ? addComment : null}
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
  return {
    getLevel: (point) => {
      return getLevel(point);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QnAComment);

// import React, {Component} from 'react';
// import { Comment, Form, Button, List, Input, Tooltip, Avatar, Collapse } from 'antd';
// import moment from 'moment';
// import { db,storage } from "../firebase";
// import {connect} from 'react-redux';
// import lv0 from '../level_tree/lv0.png';
// import lv1 from '../level_tree/lv1.png';
// import lv2 from '../level_tree/lv2.png';
// import {getLevel} from '../actions/authentication';
// import PropTypes from 'prop-types';
// import Profile from './profile';


// const { Panel } = Collapse;

// function callback(key) {
//   console.log(key);
// }

// const { TextArea } = Input;
// const Editor = ({ onChange, onSubmit, submitting, value, username }) => (
//   <>
//     <div>{username}</div>
//     <Form.Item>
//       <Input
//       type='text'
//       onChange={onChange}
//       value={value}
//       style={{height: 50}}>
//       </Input>
//       <Button htmlType="submit" loading={submitting} onClick={onSubmit} 
//       type="primary" style={{marginTop: 10, float: "right"}}>
//         Add Answer 
//       </Button>
//     </Form.Item>
//   </>
// );

// class QnAComment extends Component {
  
//   constructor(props){
//     super(props);

//     this.state = {
//       comments: [],
//       submitting: false,
//       value: '',
//       point: 0,
//     };    
//     console.log(window.sessionStorage.getItem("id"))
//   }

//   componentDidMount(){
//     this.getComments();
//     // this.getMarker();
//   }

//   getComments = async () => {
//     const snapshot = await db.collection("QnAList/"+this.props.posting+"/Comments").get()
//     console.log(snapshot.docs.map(doc=>doc.data()))
//     this.setState({comments:snapshot.docs.map(doc=>doc.data())})  
//   }

//   getPoints = async (id) => {
//     const snapshot = await db.collection("Users").doc(id).get()
//     console.log(snapshot.docs.map(doc=>doc.data()))
//     return snapshot.data().point
//   }

//   handleSubmit = () => {
//     if (!this.state.value) {
//       return;
//     }
//     console.log(window.sessionStorage.getItem("id"))
//     this.setState({
//       submitting: true,
//     });

//     setTimeout(() => {
//       db.collection('QnAList').doc(this.props.posting).collection("Comments").doc().set({author:window.sessionStorage.getItem("id"), content:this.state.value, datetime:moment().valueOf()})
//       this.setState({
//         submitting: false,
//         value: '',
//         comments: [
//           {
//             author: window.sessionStorage.getItem("id"),
//             content: <p>{this.state.value}</p>,
//             datetime: moment().fromNow(),
//           },
//           ...this.state.comments,
//         ],
//       });
//     }, 1000);
//   };

//   handleChange = e => {
//     this.setState({
//       value: e.target.value,
//     });
//   };
  
// //   getMarker = async () => {
// //     const snapshot = await db.collection('Users').doc(this.props.currentUser).get();
// //     console.log(snapshot);
// //     this.setState({point:snapshot.data().point});
// // }

//   // getPoints = async (id) => {
//   //   const snapshot = await db.collection("Users").doc(id).get()
//   //   // console.log(snapshot.docs.map(doc=>doc.data()))
//   //   return snapshot.data().point
//   // }

//   render() {
//     const { comments, submitting, value } = this.state;

//     var point=this.state.point;
//     const level=this.props.getLevel(point);
//     let profileTree=null;

//     switch (level) {
//         case 1:
//             profileTree=<img src={lv1}></img>
//             break;
//         case 2:
//             profileTree=<img src={lv2}></img>
//             break;
//         default:
//             profileTree=<img src={lv0}></img>
//             break;
//     }

//     const addComment=(
//       <>
//       <Comment
//         content={
//           <Editor
//             onChange={this.handleChange}
//             onSubmit={this.handleSubmit}
//             submitting={submitting}
//             value={value}
//             username={window.sessionStorage.getItem("id")}
//           />
//         }
//         avatar={
//           <Profile
//             writer={window.sessionStorage.getItem("id")}>
//           </Profile>
//         }
//       />
//       </>
//     )

//     return (
//       <>
//         <List
//             className="comment-list"
//             locale={{emptyText: 'No answers yet!'}}
//             header={`${comments.length} answers`}
//             itemLayout="vertical"
//             dataSource={comments}
//             renderItem={item => (
//                 // <li>
//                 <Comment
//                     // actions={item.actions}
//                     author={item.author}
//                     content={item.content}
//                     datetime={item.datetime.fromNow}
//                     avatar={
//                       <Profile
//                         writer={item.author}>
//                       </Profile>
//                     }
//                 />
//                 // {/* {this.getPoints(item.author)} */}
//                 // </li>
//             )}
//             />
//         {this.props.status.isLoggedIn ? addComment : null}
//       </>
//     );
//   }
// }

// const mapStateToProps=(state)=>{
//     return{
//         status: state.authentication.status
//     };
// };

// const mapDispatchToProps=(dispatch)=>{
//     return{
//         getLevel: (point)=>{
//             return getLevel(point);
//         }
//     };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(QnAComment);