import React, { useState } from 'react';
//import {Header} from '../components';
import "./CampHome.css";
import { Layout, Menu } from 'antd';
import {
    HomeOutlined,
    QuestionCircleOutlined,
    BarChartOutlined
  } from '@ant-design/icons';
  


const CampHome = () =>{
    const { Header, Content, Footer, Sider } = Layout;
    return (
        <Layout>
            <Sider
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                }}
            >
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
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
                <div style={{'padding-left':20, 'width':100}}>
                    <p id="camptitle">Hackathon Title</p>
                </div>
            </Header>
            <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                <div className="site-layout-background" style={{ padding: 24, textAlign: 'center' }}>
                ...
                <br />
                Really
                <br />


                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>FORECST ©2020 Created by MADMAX</Footer>
        </Layout>
    </Layout>
    );
};

export default CampHome;