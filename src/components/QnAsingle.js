import React, {Component} from 'react';
import {List, Divider, Button, Row, Col, Space} from 'antd';
import {db} from '../firebase';
import QnAComment from './qna comment';

class QnAsingle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sentTitle: '',
            qna: [],
        };
    }

    
    getMarker = async () => {
        const snapshot = await db.collection('QnAList').orderBy("date","desc").get()
        console.log(snapshot.docs)
        this.setState({qna: snapshot.docs})
    }
    setTitle = async () => {
        console.log(this.props.location.pathname.split("/")[2])
        const piece = this.props.location.pathname.split("/")
        console.log(piece[2])
        const snapshot = await db.collection('QnAList').where("title","==",piece[2]).get()
        console.log(snapshot.docs)
        await this.setState({qna: snapshot.docs})

        console.log(this.state.qna)
    }

    componentDidMount(){
        this.getMarker();
        this.setTitle();
    }


    render(){
        return(
            <List
            itemLayout="vertical"
            size="large"
            dataSource={this.state.qna}
            renderItem={item => (
                <div style={{width: 1000, margin: "auto", fontFamily: "Roboto", marginTop: 20}}>
                    <Space> 
                        `<div style={{width: 1000, margin: "auto"}}>
                            <Row>
                                <Col span={20} style={{fontSize: 25, fontWeight: "bold"}}>{item.data().title}</Col>
                                <Col span={4} style={{fontSize: 15, paddingTop: 10}}>
                                    <div style={{float: 'right'}}>
                                      Asked by {item.data().writer}
                                    </div>
                                </Col>
                            </Row>

                            <Divider/>
                            
                            <Row style={{marginBottom: '20px'}}>
                                <h6>Likes | {item.data().likes}</h6>
                                <h6 style={{marginLeft: '16px'}}>Views | {item.data().views}</h6>
                            </Row>

                            <text style={{fontSize: 20}}>{item.data().writing}</text>

                            <div style={{paddingTop: 20}}>
                                <QnAComment posting = {item.id} id ={item.data().id}></QnAComment>
                            </div>
                        </div>
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