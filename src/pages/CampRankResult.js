import React, {Component} from 'react';
// import { Menu} from '../components';
import { Progress, Row, Col, Typography } from 'antd';
const { Title } = Typography;


class CampRankResult extends React.Component {
    render(){
        return (
            <div style={{padding:20}}>
                {/* <Menu></Menu> */}
                <Title>Results for the Final Ranking</Title>
                <Title level={3}>'Project D' is the winner. Congratulations!</Title>
                <Progress percent={2} strokeColor={'#99ceff'} strokeWidth={'15px'}></Progress>
                <Progress percent={8} strokeColor={'#99ceff'} strokeWidth={'15px'}></Progress>
                <Progress percent={15} strokeColor={'#99ceff'} strokeWidth={'15px'}></Progress>
                <Progress percent={5} strokeColor={'#99ceff'} strokeWidth={'15px'}></Progress>
                <Progress percent={25} status="active" strokeColor={'#1890ff'} strokeWidth={'15px'}></Progress>
                <Progress percent={10} strokeColor={'#99ceff'} strokeWidth={'15px'}></Progress>
                <Progress percent={12} strokeColor={'#99ceff'} strokeWidth={'15px'}></Progress>
                <Progress percent={13} strokeColor={'#99ceff'} strokeWidth={'15px'}></Progress>
                <Progress percent={6} strokeColor={'#99ceff'} strokeWidth={'15px'}></Progress>
                <Progress percent={4} strokeColor={'#99ceff'} strokeWidth={'15px'}></Progress>
            </div>
        )
    }
}

export default CampRankResult;