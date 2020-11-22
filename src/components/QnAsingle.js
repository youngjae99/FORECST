import React, {Component} from 'react';
import {List, Divider, Button, Row, Col, Space} from 'antd';
import {db} from '../firebase';
import QnAComment from './qna comment';

class QnAsingle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            qna: []
        };
    }
    componentDidMount(){
        this.getMarker();
    }
    getMarker = async () => {
        const snapshot = await db.collection('QnAList').get()
        console.log(snapshot.docs)
        this.setState({qna:snapshot.docs})  
    }

    render(){
        return(
            <List
                itemLayout="vertical"
                size="large"
                dataSource={this.state.qna}
                renderItem={item => (
                    <div>
                        {/* <img src={item.data().photo} style={profileStyle} alt="profileimg"/> */}
                        <Space style={{marginLeft: '16px', marginRight: '16px'}}>
                            `<Row>
                                <Row>
                                    <h3 style={{marginRight: '16px'}}>{item.data().writer}</h3>
                                    <h2>{item.data().title}</h2>
                                </Row>
                                <Row>
                                    <Divider/>
                                    <Row>
                                        <h6>Likes | {item.data().likes}</h6>
                                        <h6 style={{marginLeft: '16px'}}>Views | {item.data().views}</h6>
                                    </Row>
                                    <h6>{item.data().content}</h6>
                                    <Button></Button>
                                    <QnAComment posting = {item.writer} ></QnAComment>`
                                </Row>
                            </Row>
                        </Space>
                    </div>
                )}
            />
        )
    }
}

const profileStyle = {
    width: "60px",
    height: "60px"
}

export default QnAsingle;