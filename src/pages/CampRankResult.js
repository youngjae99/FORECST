import React, {Component} from 'react';
// import { Menu} from '../components';
import { Progress, Row, Col } from 'antd';

class CampRankResult extends React.Component {
    render(){
        return (
            <div>
                {/* <Menu></Menu> */}
                <h1>Results for the Final Ranking</h1>
                <h4>'Project D' is the winner. Congratulations!</h4>
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