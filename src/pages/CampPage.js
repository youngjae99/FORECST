import React, { useState } from "react";
//import {Header} from '../components';
import "./CampHome.css";
import CampTabView from "./CampTabView";
import WGO from "../components/whatsgoingon";

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
      whatsgoingon: []
    };
  }


  handleClick = (e) => {
    console.log("clicked tab", e.key);
    this.setState({ tab: parseInt(e.key, 10) });
  };

  render() {

    return (
      <Layout style={{fontFamily: 'Roboto'}}>
        <Header style={{background: '#fff', paddingTop: 15, paddingLeft: 130}}>
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
          </Sider>

          <Layout
            style={{
              marginLeft: 200,
              marginRight: 200,
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
              padding: 20,
              backgroundColor: "gray"
            }}

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
              <Countdown
                title="Countdown"
                value={deadline}
                onFinish={onFinish}
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
