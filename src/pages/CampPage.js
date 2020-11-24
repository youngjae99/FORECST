import React, { useState } from "react";
//import {Header} from '../components';
import "./CampHome.css";
import CampTabView from "./CampTabView";
import WGO from "../components/whatsgoingon";
import l0_trans from '../level_tree/l0_trans.png';
import l1_trans from '../level_tree/l1_trans.png';
import l2_trans from '../level_tree/l2_trans.png';
import {getLevel} from '../actions/authentication';

import {
  Layout,
  Menu,
  Timeline,
  Statistic,
  Typography,
  List,
  Avatar,
  Space,
  Button,
  Row,
  Col,
  Divider,
} from "antd";
import {
  HomeOutlined,
  QuestionCircleOutlined,
  BarChartOutlined,
  MessageOutlined,
  LikeOutlined,
  StarOutlined,
  SearchOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { db, storage } from "../firebase";

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
const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

function onFinish() {
  console.log("finished!");
}

const { Header, Content, Footer, Sider } = Layout;

class CampPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab:1,
      feed: [],
      forest: [],
      whatsgoingon: []
    };
  }
  componentDidMount(){
    this.getMarker();
  }
  getMarker = async () => {
      const snapshot = await db.collection('Users').get()
      console.log(snapshot.docs)
      this.setState({forest: snapshot.docs})
  }


  handleClick = (e) => {
    console.log("clicked tab", e.key);
    this.setState({ tab: parseInt(e.key, 10) });
  };

  render() {
    const getTree = (point) => {
      const level= getLevel(point);
      console.log(point)
      console.log(level)
      let profileTree=null;
  
      switch (level) {
          case 1:
              return l1_trans
              break;
          case 2:
              return l2_trans
              break;
          default:
              return l0_trans
              break;
      }
    }

    return (
      <Layout style={{fontFamily: 'Roboto', position: "fixed", overflow: "hidden"}}>
        <Header style={{ background: '#fff', paddingTop: 15, paddingLeft:30}}>
          <div>
            <Title level={3} id="camptitle" style={{ margin: 0, padding: 0 }}>
              CAMP | Make an application for the pandemic COVID 19 situation!
            </Title>
            {/* <p>this is the camp about the </p> */}
          </div>
        </Header>

        <Layout>
          <Sider
            style={{
              overflow: "auto",
              height: "100vh",
              position: "fixed",
              left: 0,
            }}
            theme="light"
          >
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
            <h4 style={{margin: "10px"}}>We are growing this beautiful forest together!</h4>
              <List
                style={{backgroundColor: '#beedb2', borderRadius: 10, margin: '9px'}}
                grid={{gutter:16,}}
                dataSource={this.state.forest}
                renderItem={item => (
                  <div>
                    <img src={getTree(item.data().point)} style={{width: "50px", height: "50px", margin: "5px"}}></img>
                    <div style ={{margin:"5px",fontSize:"2px"}}>{item.id}</div>
                    
                  </div>
                )}
              />
          </Sider>

          <Layout
            style={{
              marginLeft: 200,
              marginRight: 300,
              overflow: "auto",
              height: "100vh",
              width: "match-parent"
            }}
          >
            <CampTabView tabnum={this.state.tab}></CampTabView>
          </Layout>

          <div></div>

          <Sider
            theme="light"
            style={{
              overflow: "auto",
              height: "100vh",
              position: "fixed",
              right: 0,
              padding: 15,
            }}
            width="300"
          >
            <div
              style={{
                color: "000",
              }}
            >
              <Countdown
                title="Time Left"
                value={deadline}
                format="D 일 H 시 m 분 s 초"
              />
            </div>

            <WGO wgo={this.state.whatsgoingon} />
          </Sider>
        </Layout>
      </Layout>
    );
  }
}

export default CampPage;
