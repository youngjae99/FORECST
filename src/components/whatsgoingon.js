import React, { Component } from "react";
import { List, Typography} from "antd";
import { db, storage } from "../firebase";
import postimg from "../post.png";
import questionimg from "../question.png";
import { isFlow } from "../../../../../../../../../Caches/typescript/4.0/node_modules/@babel/types/lib/index";

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


  toTime = orgtime => {
    var s = Date.now() - orgtime;
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;
    var day = hrs/24;

    if(hrs<1){
        return mins + ' minutes ago';
    }
    else if(hrs<24){
        return hrs + ' hour ago';
    }
    else{
        return "long time ago";
    }
  }

  render() {
    const logo = (mode) => {
      if (mode == "post") return postimg;
      else if (mode == "question") return questionimg;
    };

    console.log()

    return (
      <div className="shadowbox"
      style={{
        background: "#fff",
        borderRadius:"10px",
        margin: "10px",        
        paddingTop: "10px",
        paddingLeft: "10px",
        paddingRight: "10px",
        paddingBottom: "10px"
      }}>
        <h6>What's going on</h6>
        <List
          itemLayout="vertical"
          size="large"
          dataSource={this.state.wgo}
          style={{ marginTop: "20px" }}
          renderItem={(item) => (
            <div style={{ margin: "10px" }}>
              <img src={logo(item.data().mode)} style={typeimgStyle} />
              {item.data().content}
              <div style={{ fontSize: 9, float: "right", verticalAlign: "bottom", lineHeight:"25px"}}>
                {this.toTime(parseInt(item.data().time))}
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
