import React from "react";
import "./CampHome.css";
import CampTabView from "./CampTabView";
import WGO from "../components/whatsgoingon";
import l0_trans from "../level_tree/l0_trans.png";
import l1_trans from "../level_tree/l1_trans.png";
import l2_trans from "../level_tree/l2_trans.png";
import { getLevel } from "../actions/authentication";
import { Layout, Menu, Statistic, Typography, List } from "antd";
import {
  HomeOutlined,
  QuestionCircleOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import { db } from "../firebase";
import { Link } from "react-router-dom";

const { Countdown } = Statistic;
const { Title } = Typography;
const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Moment is also OK

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

const { Sider } = Layout;

class CampPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 1,
      feed: [],
      forest: [],
      whatsgoingon: [],
      num_p: 0
    };
  }
  componentDidMount() {
    this.getMarker();
  }
  getMarker = async () => {
    const snapshot = await db.collection("Users").get();
    console.log(snapshot.docs);
    this.setState({ forest: snapshot.docs,
      num_p: snapshot.docs.length
    });
  };

  handleClick = (e) => {
    console.log("clicked tab", e.key);
    this.setState({ tab: parseInt(e.key, 10) });
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
            <div>
              <Title level={3} id="camptitle" style={{ margin: 0, padding: 0 }}>
                CAMP | Make an application for the pandemic COVID 19 situation!
              </Title>
              {/* <p>this is the camp about the </p> */}
            </div>
          </div>

          <Layout>
            <div className="sidenav left">
              <div className="white_sidenav">
                <Menu theme="light" mode="inline" defaultSelectedKeys={["1"]}>
                  <Menu.Item
                    key="1"
                    icon={<HomeOutlined />}
                    onClick={this.handleClick}
                  >
                    Home
                  </Menu.Item>
                  <Menu.Item
                    key="2"
                    icon={<QuestionCircleOutlined />}
                    onClick={this.handleClick}
                  >
                    QnA Board
                  </Menu.Item>
                  <Menu.Item
                    key="3"
                    icon={<BarChartOutlined />}
                    onClick={this.handleClick}
                  >
                    Ranking
                  </Menu.Item>
                </Menu>

                <div className="forestBox" style={{margin:"10px"}}>
                  <h6 style={{ margin: "10px" }}>Hackathon Forest</h6>
                  <p className="peoplenum">{this.state.num_p} participants now</p>
                  <List
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
              <CampTabView tabnum={this.state.tab}></CampTabView>
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
                  value={deadline}
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

export default CampPage;
