import React from 'react';
import {Row, Col, Form, Input, Button} from 'antd';
import {Link, } from 'react-router-dom';
import {useEffect,useState} from 'react';
import {connect} from 'react-redux';

import { db,storage } from "../firebase";
import 'antd/dist/antd.css';
import PropTypes from 'prop-types'
import { render } from '@testing-library/react';
import {backend_Point} from "../backend";

function UploadPost(props){
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
      const handleImage = e => {
        console.log(e.target.files[0])
    
          setFile(e.target.files[0]); 
      let reader = new FileReader();
      reader.onload=function(a){
        setImage(a);
    
      };
      reader.readAsDataURL(e.target.files[0]);
    
      }
    
      const handlePost = async() =>{
        const storageRef = storage.ref();
        const fileRef = storageRef.child(file.name);
        await fileRef.put(file)
        const currentUser = await props.status.currentUser
        console.log(currentUser)
            db.collection('Feeds').doc().set({id:currentUser,photo:await fileRef.getDownloadURL(),writing:writing,title:title});
            console.log('Uploaded a blob or file!');
            backend_Point(currentUser,"post")
        }
    
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
                        <input type="file" name="file" onChange={handleImage}/>
                        {/* <img className='profile_preview' src={image}></img> */}
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
                        name='writing'
                        placeholder="writing"
                        value={writing}
                        onChange={handleChange}                        
                        style={{height: 300}}
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

export default connect(mapStateToProps, mapDispatchToProps)(UploadPost);