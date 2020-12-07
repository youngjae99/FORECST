import React, { Component } from "react";
import { Header, Menu } from "../components";
import Feed from "../components/feed";
import { db, storage } from "../firebase";
import { Spin, Button, Input, Typography } from "antd";
import { Link } from "react-router-dom";
import { SmileOutlined ,FlagOutlined, ShareAltOutlined, PlusOutlined } from "@ant-design/icons";
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
    };
  }

  componentDidMount() {
    this.getMarker();
  }
  getMarker = async () => {
    const snapshot = await db.collection("Feeds").orderBy("time","desc").get(); // Server data 가져오기
    console.log(snapshot.docs); // feed 정보 불러옴
    this.setState({ feed: snapshot.docs });
    console.log("loaded");
    this.setState({ loading: false });
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
        <div className="CampHome" style={{ padding:"5px 20px 20px 20px" }}>
          <div
            className="TopBar"
            style={{
              width: "100%",
              height: "120px",
              padding: "15px",
              backgroundColor: "white",
              marginBottom: "15px",
              //outline: "2px solid black",
              borderRadius: "12px",
              boxShadow: "0px 2px 5px 2px rgba(0,0,0,0.16)"
            }}
          >
            <Title level={4}>Share what you have done freely!</Title>
            <Link to="/UploadPost">
            <Button
            className="BtnClass"  
              type="primary"
              shape="round"
              icon={<PlusOutlined />}
              size={"large"}
              style={{float: "right"}}
            >
              New Post
            </Button>
            </Link>
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
