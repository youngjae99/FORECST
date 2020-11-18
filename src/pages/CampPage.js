import React, { useState } from "react";
//import {Header} from '../components';
import "./CampHome.css";
import CampTabView from "./CampTabView";

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
  state = { tab: 1 };

  handleClick = (e) => {
    console.log("click ", e.key);
    this.setState({ tab: parseInt(e.key, 10) });
  };

  render() {
    const { tab } = this.state;

    return (
      <Layout>
        <Sider
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
          }}
        >
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
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

        <Layout style={{ marginLeft: 200, marginRight: 200 }}>
          <CampTabView tabnum={tab}></CampTabView>
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
            <Countdown title="Countdown" value={deadline} onFinish={onFinish} />
          </div>

          <div>
            <Timeline>
              <Timeline.Item color="green">
                Create a services site 2015-09-01
              </Timeline.Item>
              <Timeline.Item color="green">
                Create a services site 2015-09-01
              </Timeline.Item>
              <Timeline.Item color="red">
                <p>Solve initial network problems 1</p>
                <p>Solve initial network problems 2</p>
                <p>Solve initial network problems 3 2015-09-01</p>
              </Timeline.Item>
              <Timeline.Item>
                <p>Technical testing 1</p>
                <p>Technical testing 2</p>
                <p>Technical testing 3 2015-09-01</p>
              </Timeline.Item>
              <Timeline.Item color="gray">
                <p>Technical testing 1</p>
                <p>Technical testing 2</p>
                <p>Technical testing 3 2015-09-01</p>
              </Timeline.Item>
              <Timeline.Item color="gray">
                <p>Technical testing 1</p>
                <p>Technical testing 2</p>
                <p>Technical testing 3 2015-09-01</p>
              </Timeline.Item>
            </Timeline>
          </div>
        </Sider>
      </Layout>
    );
  }
}

export default CampPage;
