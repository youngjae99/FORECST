import React from 'react';
import {Row, Col, Form, Input, Button} from 'antd';
import {Link, } from 'react-router-dom';

class UploadPost extends React.Component{
    render(){
        return(
            <div style={{fontFamily: "Roboto", width: 1200, margin: "auto", paddingTop: 20}}>
                <Row>
                    <Col span={3}>
                        <div style={{fontSize: 24, fontWeight: "bold"}}>
                            Write a Post.
                        </div>
                    </Col>
                    <Col span={21}>
                        <div style={{fontSize: 24}}>
                            freely share your thinking and what you did!
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col span={3}>
                        <div style={{fontSize: 18, marginTop: 20, textAlign: "right", marginRight: 10}}>
                            Add a Picture:
                        </div>
                    </Col>
                    <Col span={21} style={{marginTop: 20}}>
                    </Col>
                </Row>

                <Row>
                <Col span={3}>
                        <div style={{fontSize: 18, marginTop: 20, textAlign: "right", marginRight: 10}}>
                            Title:
                        </div>
                    </Col>
                    <Col span={21} style={{marginTop: 20}}>
                        <Form.Item
                        // label="Username"
                        // name="username"
                        rules={[
                            {
                                required:true,
                                message: 'Please input your username.',
                            }
                        ]}>
                            <Input
                            name='username'
                            type='text'
                            // onChange={this.handleChange}
                            // value={this.state.username}
                            >
                            </Input>
                        </Form.Item>
                    </Col>
                </Row>

                <Row>
                <Col span={3}>
                        <div style={{fontSize: 18, marginTop: 20, textAlign: "right", marginRight: 10}}>
                            Content:
                        </div>
                    </Col>
                    <Col span={21} style={{marginTop: 20}}>
                        <Form.Item
                        // label="Username"
                        // name="username"
                        rules={[
                            {
                                required:true,
                                message: 'Please input your username.',
                            }
                        ]}>
                            <Input
                            name='username'
                            type='text'
                            // onChange={this.handleChange}
                            // value={this.state.username}
                            style={{height: 300}}
                            >
                            </Input>
                        </Form.Item>

                        <div style={{textAlign: "right"}}>
                            <Button type='primary' style={{marginLeft: 100}}>
                                <Link to={"/mypage"} style={{fontSize: 18}}>UPLOAD</Link>
                            </Button>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default UploadPost;