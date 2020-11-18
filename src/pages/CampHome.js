import React, { useState } from "react";
//import {Header} from '../components';
import "./CampHome.css";
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
  Row, Col 
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

      <Layout
        className="site-layout"
        style={{ marginLeft: 200, marginRight: 200 }}
      >
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <div style={{ "padding-left": 20, width: 200 }}>
            <Title level={3} id="camptitle">
              Hackathon Title
            </Title>
          </div>
        </Header>
        
        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>

        <Row style={{backgroundColor:"white"}}>
          <Col span={24}>col</Col>
        </Row>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            style={{ position: "absolute", right: 210, margin:10}}
          >
            New Post
          </Button>

          <div
            className="site-layout-background"
            style={{ padding: 24, textAlign: "center", marginTop: 50 }}
          >
            <List
              itemLayout="vertical"
              size="large"
              pagination={{
                onChange: (page) => {
                  console.log(page);
                },
                pageSize: 3,
              }}
              dataSource={listData}
              footer={
                <div>
                  <b>ant design</b> footer part
                </div>
              }
              renderItem={(item) => (
                <List.Item
                  key={item.title}
                  actions={[
                    <IconText
                      icon={StarOutlined}
                      text="156"
                      key="list-vertical-star-o"
                    />,
                    <IconText
                      icon={LikeOutlined}
                      text="156"
                      key="list-vertical-like-o"
                    />,
                    <IconText
                      icon={MessageOutlined}
                      text="2"
                      key="list-vertical-message"
                    />,
                  ]}
                  extra={
                    <img
                      width={272}
                      alt="logo"
                      src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                    />
                  }
                >
                  <List.Item.Meta
                    avatar={<Avatar src={item.avatar} />}
                    title={<a href={item.href}>{item.title}</a>}
                    description={item.description}
                  />
                  {item.content}
                </List.Item>
              )}
            />
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
};

export default CampHome;
