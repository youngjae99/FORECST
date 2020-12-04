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
} from "antd";
import moment from "moment";
import { db } from "../firebase";
import { connect } from "react-redux";
import { getLevel } from "../actions/authentication";
import { backend_Feed_watering } from "../backend";
import watering0 from "../watericon0.png";
import watering1 from "../watericon1.png";
import { MessageOutlined } from "@ant-design/icons";
import InfiniteScroll from "react-infinite-scroller";
import "./feedcomment.css";
import Profile from "./profile";

const count = 1;

function confirm(e) {
  console.log(e);
  message.success("Click on Yes");
}

function cancel(e) {
  console.log(e);
  message.error("Click on No");
}

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

class FeedComment extends Component {
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
    };
    console.log(this.props.status.currentUser);
  }

  componentDidMount() {
    this.getComments();
  }

  getComments = async () => {
    const snapshot = await db
      .collection("Feeds/" + this.props.posting + "/Comments")
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
    console.log(this.props.status.currentUser);
    this.setState({
      submitting: true,
    });

    setTimeout(() => {
      db.collection("Feeds")
        .doc(this.props.posting)
        .collection("Comments")
        .doc()
        .set({
          author: this.props.status.currentUser,
          content: this.state.value,
          datetime: moment().valueOf(),
        });
      this.setState({
        submitting: false,
        value: "",
        comments: [
          ...this.state.comments,
          {
            author: this.props.status.currentUser,
            content: <p>{this.state.value}</p>,
            datetime: moment().fromNow(),
          },
        ],
      });
      this.getComments();
    }, 1000);
  };

  handleWatering = (e) => {
    if (this.state.watered == 0) {
      backend_Feed_watering(this.props.posting, this.props.id);
      setTimeout(() => {
        this.setState({ watered: 1 });
      }, 100);
    }
  };

  handleChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  onLoadMore = () => {
    const data = this.state.list;
    const cur_len = this.state.list.length;

    console.log("data", data);
    this.setState(
      {
        list: this.state.list.concat(
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

    const watering = () => {
      if (this.state.watered == 0) {
        return watering0;
      } else return watering1;
    };

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
              username={this.props.status.currentUser}
            />
          }
          avatar={<Profile writer={this.props.status.currentUser}></Profile>}
        />
      </>
    );

    const loadMore =
      !initLoading && !loading ? (
        <div
          style={{
            textAlign: "center",
            marginTop: 12,
            height: 32,
            lineHeight: "32px",
          }}
        >
          <a onClick={this.onLoadMore} style={{color:"#007bff"}}>see all comments</a>
        </div>
      ) : null;

    return (
      /*
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
                    datetime={item.datetime.fromNow}
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
      */
      <div>
        <List
          className="comment-list"
          header={
            <div>
              {this.state.watered==0?<Popconfirm
                title="Are you sure to water this post?"
                onConfirm={this.handleWatering}
                onCancel={null}
                okText="Yes"
                cancelText="No"
              >
                <a onClick={null} style={{ float: "right" }}>
                  <img
                    src={watering()}
                    alt="wc"
                    style={{ width: "25px", height: "25px" }}
                  />
                </a>
              </Popconfirm>:<a onClick={null} style={{ float: "right" }}>
                  <img
                    src={watering()}
                    alt="wc"
                    style={{ width: "25px", height: "25px" }}
                  />
                </a>}
              

              <IconText
                icon={MessageOutlined}
                text={comments.length}
                key="list-vertical-message"
              />
            </div>
          }
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

        {this.props.status.isLoggedIn ? addComment : null}
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

export default connect(mapStateToProps, mapDispatchToProps)(FeedComment);
