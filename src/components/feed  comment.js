import React, {Component} from 'react';
import { Comment, Form, Button, List, Input, Tooltip, Avatar } from 'antd';
import moment from 'moment';

const data = [
    {
      actions: [<span key="comment-list-reply-to-0">Reply to</span>],
      author: 'Han Solo',
      content: (
        <p>
          AMAZING
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
          GOOD
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

    return (
      <div> 
        {comments.length > 0 && <CommentList comments={comments} />}
        {/* <div>
          <PageHeader
          className="site-page-header"
          title="Title"
          subTitle="This is a subtitle">
          </PageHeader>
        </div> */}

        <List
        className="comment-list"
        header={`Comments (${data.length})`}
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

        <Comment
        avatar={
          <Avatar
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            alt="Han Solo"
          />
        }
        content={
          // <Editor
          //   onChange={this.handleChange}
          //   onSubmit={this.handleSubmit}
          //   submitting={submitting}
          //   value={value}
          // />
          <Input
          // name='username'
          type='text'
          onChange={this.handleChange}
          value={value}
          style={{height: 50}}>
          </Input>
        }
        />
      </div>
    );
  }
}

export default FeedComment;