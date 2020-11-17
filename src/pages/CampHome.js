import React, { useState } from "react";
//import {Header} from '../components';
import "./CampHome.css";
import { Layout, Menu, Timeline, Statistic } from "antd";
import {
  HomeOutlined,
  QuestionCircleOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
const { Countdown } = Statistic;
const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Moment is also OK

function onFinish() {
  console.log('finished!');
}

const CampHome = () => {
  const { Header, Content, Footer, Sider } = Layout;
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
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<HomeOutlined />}>
            Home
          </Menu.Item>
          <Menu.Item key="2" icon={<QuestionCircleOutlined />}>
            QnA Board
          </Menu.Item>
          <Menu.Item key="3" icon={<BarChartOutlined />}>
            Ranking
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <div style={{ "padding-left": 20, width: 100 }}>
            <p id="camptitle">Hackathon Title</p>
          </div>
        </Header>
        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, textAlign: "center" }}
          >
            ...
            <br />
            Really
            <br />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          FORECST ©2020 Created by MADMAX
        </Footer>
      </Layout>

      <Sider
        theme="light"
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          right: 0,
        }}
      >
        <Countdown title="Time Left" value={deadline} format="D 일 H 시 m 분 s 초" />
        <Countdown title="Countdown" value={deadline} onFinish={onFinish} />
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
      </Sider>
    </Layout>
  );
};

export default CampHome;
