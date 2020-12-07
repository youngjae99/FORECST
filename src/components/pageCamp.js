import React from "react";
import "../pages/CampHome.css";
import CampTabView from "../pages/CampTabView";
import WGO from "../components/whatsgoingon";
import l0_trans from "../level_tree/l0_trans.png";
import l1_trans from "../level_tree/l1_trans.png";
import l2_trans from "../level_tree/l2_trans.png";
import { getLevel } from "../actions/authentication";
import { Layout, Menu, Statistic, Typography, List, Button } from "antd";
import {
  HomeOutlined,
  QuestionCircleOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const { Countdown } = Statistic;
const { Title } = Typography;

const listData = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    href: "https://ant.design",
    title: `ant design part ${i}`,
    avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    description:
      "Ant Design, a design language for background applications, is refined by Ant UED Team.",
    content:
      "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
  });
}

class PageCamp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: this.props.tab,
      feed: [],
      forest: [],
      whatsgoingon: [],
      num_p: 0,
      timer:0
    };
  }

  componentDidMount() {
    this.getMarker();
    console.log("tab number: ", this.state.tab);
  }

  getMarker = async () => {
    const snapshot = await db.collection("Users").get();
    const timer = await db.collection("Timer").doc("time").get();

    console.log(snapshot.docs);
    this.setState({ forest: snapshot.docs,
      num_p: snapshot.docs.length,
      timer: timer.data().timer,
    });
  };

  handleClick = (e) => {
    console.log("clicked tab", e.key);
    this.setState({ tab: parseInt(e.key, 10) });
    // this.props.history.push("/camp/"+e.key);
  };

  render() {
    const getTree = (point) => {
      const level = getLevel(point);
      console.log(point);
      console.log(level);
      let profileTree = null;

      switch (level) {
        case 1:
          return l1_trans;
          break;
        case 2:
          return l2_trans;
          break;
        default:
          return l0_trans;
          break;
      }
    };

    return (
      <Layout
        style={{
          width: "100%",
          fontFamily: "Roboto",
          position: "fixed",
          overflow: "hidden",
          display: "block",
        }}
      >
        <div
          style={{
            width: "100%",
            paddingRight: "15px",
            paddingLeft: "15px",
            marginRight: "auto",
            marginLeft: "auto",
          }}
        >
          <div
            style={{
              height: "70px",
              paddingTop: 15,
              paddingLeft: 30,
              borderBottom: "1px solid var(--colors-border)",
            }}
          >

          <Title level={3} id="camptitle" style={{ margin: 0, padding: 0, paddingTop: 10, textAlign: "center", width: "100%", paddingLeft: 200}}>
            Hackathon | Make an application for the pandemic COVID 19 situation!
            <Button type="primary" style={{float: "right", marginLeft: 10, marginRight: 40}}>
              <Link to={"/uploadproject"} style={{fontSize: 18}}>SUBMIT your project!</Link>
            </Button>
          </Title> 
          </div>

          <Layout>
            <div className="sidenav left">
              <div className="white_sidenav">
                <Menu theme="light" mode="inline" defaultSelectedKeys={[this.state.tab]}>
                  <Menu.Item
                    key="1"
                    icon={<HomeOutlined />}
                    onClick={this.handleClick}
                  >
                    <Link to={"/camp/1"} style={{textDecoration: "none"}}>Home</Link>

                  </Menu.Item>
                  <Menu.Item
                    key="2"
                    icon={<QuestionCircleOutlined />}
                    onClick={this.handleClick}
                  >
                      <Link to={"/camp/2"} style={{textDecoration: "none"}}>QnA Board</Link>
                  </Menu.Item>
                  <Menu.Item
                    key="3"
                    icon={<BarChartOutlined />}
                    onClick={this.handleClick}
                  >
                      <Link to={"/camp/3"} style={{textDecoration: "none"}}>Ranking</Link>
                  </Menu.Item>
                </Menu>

                <div className="forestBox" style={{margin:"10px"}}>
                  <h6 style={{ margin: "10px" }}>Hackathon Forest</h6>
                  <p className="peoplenum">{this.state.num_p} participants are growing forest together!</p>
                  <List
                    locale={{emptyText: 'No participants yet!'}}
                    style={{
                      backgroundColor: "#beedb2",
                      borderRadius: 10,
                      overflowY: "scroll",
                      height:"300px"
                    }}
                    grid={{ gutter: 16 }}
                    dataSource={this.state.forest}
                    renderItem={(item) => (
                      <div className="treeicon" style={{ 
                        margin: "5px",
                      }}
                      >
                        <Link className="treelink" to={"/mypage/"+item.id}>
                        <img
                          src={getTree(item.data().point)}
                          style={{
                            width: "50px",
                            height: "50px",
                            margin: "5px",
                          }}
                        />
                        <div
                          style={{
                            marginBotton: "5px",
                            fontSize: "13px",
                            textAlign: "center",
                            color: "#000"
                          }}
                        >
                          {item.id}
                        </div>
                        </Link>
                      </div>
                    )}
                  />
                </div>
              </div>
            </div>

            <Layout
              style={{
                marginLeft: 300,
                marginRight: 300,
                overflow: "auto",
                height: "100vh",
                width: "match-parent",
              }}
            >
              <CampTabView tabnum={parseInt(this.state.tab)}></CampTabView>
            </Layout>

            <div></div>

            <div className="sidenav right">
              <div
                className="timeleftbox shadowbox"
                style={{
                  background: "#fff",
                  borderRadius: "10px",
                  margin: "10px",
                  paddingTop: "10px",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                  paddingBottom: "10px",
                }}
              >
                <h6>Time left</h6>
                <Countdown
                  style={{ margin: "10px" }}
                  value={this.state.timer}
                  format="Dday H:m:s"
                />
              </div>

              <WGO wgo={this.state.whatsgoingon} />
            </div>
          </Layout>
        </div>
      </Layout>
    );
  }
}

PageCamp.propTypes={
    tab: PropTypes.string,
};

PageCamp.defaultProps={
    tab: "2"
};

export default PageCamp;