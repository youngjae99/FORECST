import React, { Component } from "react";
import Feed from "../components/feed";
import { db } from "../firebase";
import { Spin, Button, Input, Typography, Row, Col } from "antd";
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
const { Title } = Typography;
const { TextArea } = Input;

class CampHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "default",
      feed: [],
      whatsgoingon: {
        type: "everything",
        query: "domains=techcrunch.com&language=en",
      },
      loading: true,
      todo: [],
    };
  }

  componentDidMount() {
    this.getMarker();
    this.getMyToDo();
  }

  getMarker = async () => {
    await db
      .collection("Feeds")
      .orderBy("time", "desc")
      .onSnapshot(
        {
          includeMetadataChanges: true,
        },
        (snapshot) => {
          const data = snapshot.docs;
          this.setState({ feed: data });
          this.setState({ loading: false });
        }
      );
  };

  getMyToDo = async () => {
    const todo = await db
      .collection("Users")
      .doc(window.sessionStorage.getItem("id"))
      .collection("todo")
      .where("check", "==", false)
      .get();
    const completed = await db
      .collection("Users")
      .doc(window.sessionStorage.getItem("id"))
      .collection("todo")
      .where("check", "==", true)
      .get();

    this.setState({ todo: todo.docs.map((doc) => doc.data()) });
    this.setState({ completed: completed.docs.map((doc) => doc.data()) });
  };

  render() {
    if (this.state.loading == true) {
      return (
        <div
          className="CampHome"
          style={{
            padding: "100px",
            height: "100%",
            width: "100%",
            textAlign: "center",
          }}
        >
          <Spin size="large" />
        </div>
      );
    } else {
      return (
        <div className="CampHome" style={{ padding: "5px 20px 20px 20px" }}>
          <div
            className="TopBar"
            style={{
              width: "100%",
              height: 80,
              padding: "15px",
              backgroundColor: "white",
              marginBottom: "15px",
              //outline: "2px solid black",
              borderRadius: "12px",
              boxShadow: "0px 2px 5px 2px rgba(0,0,0,0.16)",
            }}
          >
            <div>
                <Title
                  level={4}
                  style={{ marginTop: 10, marginLeft: 10, float: "left" }}
                >
                  You have {this.state.todo.length} left to-do!
                </Title>
                <div style={{ float: "right" }}>
                  <div style={{ float: "right" }}>
                    <Link
                      to={{
                        pathname: `/mypage/${window.sessionStorage.getItem(
                          "id"
                        )}`,
                      }}
                    >
                      <Button
                        className="BtnClass"
                        shape="round"
                        icon={<PlusOutlined />}
                        size={"large"}
                      >
                        Add To-do
                      </Button>
                    </Link>
                  </div>
                  <div style={{ float: "right" }}>
                    <Link to="/UploadPost">
                      <Button
                        className="BtnClass"
                        type="primary"
                        shape="round"
                        icon={<PlusOutlined />}
                        size={"large"}
                      >
                        Post Completed task
                      </Button>
                    </Link>
                  </div>
                </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <Feed feed={this.state.feed} />
            </div>
          </div>
        </div>
      );
    }
  }
}

export default CampHome;
