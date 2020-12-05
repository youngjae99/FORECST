import React from 'react';
import {Row, Col, Form, Input, Button} from 'antd';
import {Link, } from 'react-router-dom';
import {useEffect,useState} from 'react';
import {connect} from 'react-redux';
import firebase from "firebase/app";

import { db,storage } from "../firebase";
import 'antd/dist/antd.css';
import PropTypes from 'prop-types'
import { render } from '@testing-library/react';
import {backend_Point,backend_WGO} from "../backend";

function UploadQnA(props){
    console.log("upload post: ", props.status.currentUser);
    const [inputs, setInputs] = useState({
        title: "",
        writing: "",
      });
      const [file, setFile] = useState(0);
      const [image,setImage] = useState(0);
      const { title,writing } = inputs;
    
      const handleChange = e => {
        const { name, value } = e.target;
        setInputs({
             ...inputs, [name]: value });
      };
      const handlePost = async() =>{
        const currentUser = await props.status.currentUser
        console.log(currentUser)
            db.collection('QnAList').doc().set({key: 1, likes: 23, views: 45, no: 1, writer:currentUser, writing:writing, title:title, date: firebase.firestore.Timestamp.now()});
            console.log('Uploaded a blob or file!');
            backend_Point(currentUser,"question")
            backend_WGO(currentUser,firebase.firestore.Timestamp.now(),"question")
        }
    
    return(
        <div style={{fontFamily: "Roboto", width: 1000, margin: "auto", paddingTop: 20}}>
            <Row>
                <Col span={8}>
                    <div style={{fontSize: 24, fontWeight: "bold", textAlign: "right"}}>
                        Ask a Question!
                    </div>
                </Col>
            </Row>

            <Row>
            <Col span={4}>
                    <div style={{fontSize: 18, marginTop: 20, textAlign: "right", marginRight: 10}}>
                        Title:
                    </div>
                </Col>
                <Col span={20} style={{marginTop: 20}}>
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
                        name='title'
                        placeholder="title"
                        value={title}
                        onChange={handleChange}                        
                        >
                        </Input>
                    </Form.Item>
                </Col>
            </Row>

            <Row>
            <Col span={4}>
                    <div style={{fontSize: 18, marginTop: 20, textAlign: "right", marginRight: 10}}>
                        Content:
                    </div>
                </Col>
                <Col span={20} style={{marginTop: 20}}>
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
                        name='writing'
                        placeholder="writing"
                        value={writing}
                        onChange={handleChange}                        
                        style={{height: 450}}
                        >
                        </Input>
                    </Form.Item>

                    <div style={{textAlign: "right"}}>
                        <Button type='primary' style={{marginLeft: 100}} onClick={handlePost}>
                            <Link to={"/mypage"} style={{fontSize: 18}}>UPLOAD</Link>
                        </Button>
                    </div>
                </Col>
            </Row>
        </div>
    );
    
}

const mapStateToProps=(state)=>{
    return{
        status: state.authentication.status
    };
};

const mapDispatchToProps=(dispatch)=>{
    return{
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadQnA);