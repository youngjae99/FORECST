import React, { Component } from "react";
import { List, Typography} from "antd";
import { db, storage } from "../firebase";
import postimg from "../post.png";
import questionimg from "../question.png";

const { Title } = Typography;


class WGO extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wgo: [],
    };
  }

  //componentDidMount() {
  // const url = `https://newsapi.org/v2/${this.props.news.type}?${this.props.news.query}&apiKey=56538f95cb824a6ca0acf842f60a5fed`;

  // fetch(url)
  //     .then((response) => {
  //         return response.json();
  //     })
  //     .then((data) => {
  //         this.setState({
  //             news: data.articles
  //         })
  //     })
  //     .catch((error) => console.log(error));
  //}
  componentDidMount() {
    this.getWGO();
  }
  getWGO = async () => {
    const snapshot = await db.collection("WGO").get();
    this.setState({ wgo: snapshot.docs });
  };

  render() {
    const logo = (mode) => {
      if (mode == "post") return postimg;
      else if (mode == "question") return questionimg;
    };

    console.log()

    return (
      <div style={{
        background: "#fff",
        borderRadius:"10px",
        margin: "10px"
      }}>
        <h5 style={{ margin: "10px" }}>What's going on</h5>
        <List
          itemLayout="vertical"
          size="large"
          dataSource={this.state.wgo}
          
          renderItem={(item) => (
            <div style={{ margin: "10px" }}>
              <img src={logo(item.data().mode)} style={typeimgStyle} />
              {item.data().content}
              <div style={{ fontSize: 9, float: "right", marginBottom: "5px" }}>
                (2 min ago)
                {item.data().content}
              </div>
            </div>
          )}
        />
      </div>
    );
  }
}

const typeimgStyle = {
  width: "20px",
  height: "20px",
  marginRight: "6px",
};

export default WGO;
