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
  Row,
  Col,
  Divider
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
    {React.createElement(icon)}∂{text}
  </Space>
);

function onFinish() {
  console.log("finished!");
}

const CampHome = (camptitle) => {
  const { Header, Content, Footer, Sider } = Layout;

  return (
    <Layout className="site-layout">
      <Content style={{ margin: "200 16px 0", overflow: "initial" }}>
       <Button
          type="primary"
          icon={<PlusOutlined />}
          style={{ position: "absolute", right: 210, margin: 10 }}
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
  );
};

export default CampHome;
