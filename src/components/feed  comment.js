import React, {Component} from 'react';
import { Comment, Form, Button, List, Input, Tooltip, Avatar, Collapse } from 'antd';
import moment from 'moment';
import {connect} from 'react-redux';
import lv0 from '../level_tree/lv0.png';
import lv1 from '../level_tree/lv1.png';
import lv2 from '../level_tree/lv2.png';
import {getLevel} from '../actions/authentication';
import PropTypes from 'prop-types';

const { Panel } = Collapse;

function callback(key) {
  console.log(key);
}

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;


const data = [
    {
      actions: [<span key="comment-list-reply-to-0">Reply to</span>],
      author: 'Han Solo',
      content: (
        <p>
          We supply a series of design principles, practical patterns and high quality design
          resources (Sketch and Axure), to help people create their product prototypes beautifully and
          efficiently.
        </p>
      ),
      datetime: (
        <Tooltip title={moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')}>
          <span>{moment().subtract(1, 'days').fromNow()}</span>
        </Tooltip>
      ),
    },
    {
      actions: [<span key="comment-list-reply-to-0">Reply to</span>],
      author: 'Han Solo',
      content: (
        <p>
          We supply a series of design principles, practical patterns and high quality design
          resources (Sketch and Axure), to help people create their product prototypes beautifully and
          efficiently.
        </p>
      ),
      datetime: (
        <Tooltip title={moment().subtract(2, 'days').format('YYYY-MM-DD HH:mm:ss')}>
          <span>{moment().subtract(2, 'days').fromNow()}</span>
        </Tooltip>
      ),
    },
  ];

const { TextArea } = Input;

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
    itemLayout="horizontal"
    renderItem={props => <Comment {...props} />}
  />
);

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
  }

  state = {
    comments: [],
    submitting: false,
    value: '',
  };

  handleSubmit = () => {
    if (!this.state.value) {
      return;
    }

    this.setState({
      submitting: true,
    });

    setTimeout(() => {
      this.setState({
        submitting: false,
        value: '',
        comments: [
          {
            author: 'Han Solo',
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
    )

    return (
      <>
        {comments.length > 0 && <CommentList comments={comments} />}
        <List
            className="comment-list"
            header={`${data.length} replies`}
            itemLayout="horizontal"
            dataSource={data}
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