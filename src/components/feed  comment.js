import React, {Component} from 'react';
import { Comment, Form, Button, List, Input, Tooltip } from 'antd';
import moment from 'moment';
import { db,storage } from "../firebase";
import {connect} from 'react-redux';
// const data = [
//     {
//       actions: [<span key="comment-list-reply-to-0">Reply to</span>],
//       author: 'Han Solo',
//       content: (
//         <p>
//           We supply a series of design principles, practical patterns and high quality design
//           resources (Sketch and Axure), to help people create their product prototypes beautifully and
//           efficiently.
//         </p>
//       ),
//       datetime: (
//         <Tooltip title={moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')}>
//           <span>{moment().subtract(1, 'days').fromNow()}</span>
//         </Tooltip>
//       ),
//     },
//     {
//       actions: [<span key="comment-list-reply-to-0">Reply to</span>],
//       author: 'Han Solo',
//       content: (
//         <p>
//           We supply a series of design principles, practical patterns and high quality design
//           resources (Sketch and Axure), to help people create their product prototypes beautifully and
//           efficiently.
//         </p>
//       ),
//       datetime: (
//         <Tooltip title={moment().subtract(2, 'days').format('YYYY-MM-DD HH:mm:ss')}>
//           <span>{moment().subtract(2, 'days').fromNow()}</span>
//         </Tooltip>
//       ),
//     },
//   ];

const { TextArea } = Input;

// const CommentList = ({ comments }) => (
//   <List
//     dataSource={comments}
//     header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
//     itemLayout="horizontal"
//     renderItem={props => <Comment {...props} />}
//   />
// );

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <div>Comment</div>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
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

  handleSubmit = () => {
    if (!this.state.value) {
      return;
    }
    console.log(this.props.status.currentUser)
    this.setState({
      submitting: true,
    });

    setTimeout(() => {
      db.collection('Feeds').doc(this.props.posting).collection("Comments").doc().set({author:this.props.status.currentUser,content:this.state.value,datetime:moment()})
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

  handleChange = e => {
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    const { comments, submitting, value } = this.state;

    return (
      <>
        <List
            className="comment-list"
            header={`${comments.length} replies`}
            itemLayout="horizontal"
            dataSource={comments}
            renderItem={item => (
                <li>
                <Comment
                    actions={item.actions}
                    author={item.author}
                    content={item.content}
                    datetime={moment(item.datetime).fromNow()}
                />
                </li>
            )}
            />
        <Comment
          content={
            <Editor
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              submitting={submitting}
              value={value}
            />
          }
        />
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedComment);
