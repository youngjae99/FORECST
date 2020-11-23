import React, { Component } from "react";
import { Header, Menu } from "../components";
import Feed from "../components/feed";
import { db, storage } from "../firebase";
import { Spin } from "antd";
import { Link } from "react-router-dom";

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
      loading:true
    };
  }

  componentDidMount() {
    this.getMarker();
  }

  getMarker = async () => {
    const snapshot = await db.collection("Feeds").get(); // Server data 가져오기
    console.log(snapshot.docs); // feed 정보 불러옴
    this.setState({ feed: snapshot.docs });
    console.log("loaded");
    this.setState({loading:false});
  };

  render() {
    if (this.state.loading == true) {
      return (
        <div className="CampHome" style={{ padding: "100px", height:"100%", width:"100%", textAlign:"center"}}>
          <Spin size="large" />
        </div>
      );
    } else {
      return (
        <div className="CampHome" style={{ padding: 20 }}>
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
