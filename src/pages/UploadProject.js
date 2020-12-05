import React from 'react';
import {Row, Col, Form, Input, Button, Select, List} from 'antd';
import {Link, } from 'react-router-dom';
import {useEffect,useState} from 'react';
import {connect} from 'react-redux';
import firebase from "firebase/app";

import { db,storage } from "../firebase";
import 'antd/dist/antd.css';
import PropTypes from 'prop-types'
import { render } from '@testing-library/react';
import { message} from 'antd';

function UploadProject(props){
    console.log("upload post: ", window.sessionStorage.getItem("id"));
    const [inputs, setInputs] = useState({
        title: "",
        description: "",
        githuburl: "",
      });
      const [file, setFile] = useState(0);
      const [image,setImage] = useState(0);
      const [projects, setProjects] = useState([]);
      const { title, description, githuburl } = inputs;
    
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
      const error = () => {
        message.error('You should upload PICTURE!!');
      };

      useEffect(() => {
        getProjects();
      },[])

      const getProjects = async () =>{
        const project = await db.collection("Projects").get();
        setProjects(project.docs.map(doc=>doc.data().todo));
    }
      
    
      const handlePost = async() =>{
        if(file == 0){
            error();
        }
        else{
        const storageRef = storage.ref();
        const fileRef = storageRef.child(file.name);
        await fileRef.put(file)
        const currentUser = window.sessionStorage.getItem("id")
        console.log(currentUser)
        var min = 3;
        var max = 32;
        var rand = min + (Math.random() * (max-min))
            db.collection("Projects").doc().set({id:currentUser,photo:await fileRef.getDownloadURL(),description:description, projectTitle:title, num: (projects.length + 1), votes: rand, githuburl: githuburl, time: Date.now()});
            console.log('Uploaded a blob or file!');
        }
    }

    const { Option } = Select;
    
    return(
        <div style={{fontFamily: "Roboto", width: 1000, margin: "auto", paddingTop: 20}}>
            <Row>
                <Col span={9}>
                    <div style={{fontSize: 26, fontWeight: "bold", textAlign: "right"}}>
                        Let us know about your Project.
                    </div>
                </Col>
                <Col span={20}>
                    <div style={{fontSize: 20, marginLeft: 10}}>
                        Well done on finishing your project! Now introduce you project to everyone.
                    </div>
                </Col>
            </Row>
            <Row>
            <Col span={6}>
                    <div style={{fontSize: 18, marginTop: 20, textAlign: "right", marginRight: 10}}>
                        Project Title:
                    </div>
                </Col>
                <Col span={18} style={{marginTop: 20}}>
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
                        placeholder="Project Title"
                        value={title}
                        onChange={handleChange}                        
                        >
                        </Input>
                    </Form.Item>
                </Col>
            </Row>

            <Row>
                <Col span={6}>
                    <div style={{fontSize: 18, marginTop: 20, textAlign: "right", marginRight: 10}}>
                        Add One Best Picture:
                    </div>
                </Col>
                <Col span={18} style={{marginTop: 20}}>
                    <input type="file" name="file" onChange={handleImage}/>
                </Col>
            </Row>

            <Row>
            <Col span={6}>
                    <div style={{fontSize: 18, marginTop: 20, textAlign: "right", marginRight: 10}}>
                        Github URL:
                    </div>
                </Col>
                <Col span={18} style={{marginTop: 20}}>
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
                        name='githuburl'
                        placeholder="Github URL"
                        value={githuburl}
                        onChange={handleChange}                        
                        >
                        </Input>
                    </Form.Item>
                </Col>
            </Row>

            <Row>
            <Col span={6}>
                    <div style={{fontSize: 18, marginTop: 20, textAlign: "right", marginRight: 10}}>
                        Description:
                    </div>
                </Col>
                <Col span={18} style={{marginTop: 20}}>
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
                        name='description'
                        placeholder="Write about your Project!"
                        value={description}
                        onChange={handleChange}                        
                        style={{height: 450}}
                        >
                        </Input>
                    </Form.Item>

                    <div style={{textAlign: "right"}}>
                        <Button type='primary' style={{marginLeft: 100}} onClick={handlePost}>
                             {file==0?
                             <div style={{fontSize: 18}}>SUBMIT</div> :
                             <Link to={"/camp"} style={{fontSize: 18}}>SUBMIT</Link>}
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

export default connect(mapStateToProps, mapDispatchToProps)(UploadProject);