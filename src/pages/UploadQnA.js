import React from 'react';
import {Row, Col, Form, Input, Button, Modal, Avatar, Progress} from 'antd';
import {Link, } from 'react-router-dom';
import {useState} from 'react';
import {connect} from 'react-redux';
import { db } from "../firebase";
import 'antd/dist/antd.css';
import {backend_Point,backend_WGO} from "../backend";
import lv0 from '../level_tree/lv0.png';
import lv1 from '../level_tree/lv1.png';
import lv2 from '../level_tree/lv2.png';
import lv3 from '../level_tree/lv3.png';
import {getLevel, getPrevPoint, getNextPoint} from '../actions/authentication';

function UploadQnA(props){
    console.log("upload post: ", window.sessionStorage.getItem("id"));
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

    const handleOk=()=>{
        Modal.destroyAll();
    }

    //Point Alert
    const[point, setPoint]=useState(0);

    const getMarker = async () => {
        const snapshot = await db.collection('Users').doc(window.sessionStorage.getItem("id")).get()
        console.log("getmarker", snapshot.data().point)
        setPoint(snapshot.data().point); 
    }

    const handleModal=()=>{
        const level=props.getLevel(parseInt(point));
        const prevPoint=props.getPrevPoint(level);
        const nextPoint=props.getNextPoint(level);
        let profileTree=null;

        switch (level) {
            case 1:
                profileTree=<img src={lv1}></img>
                break;
            case 2:
                profileTree=<img src={lv2}></img>
                break;
            default:
                profileTree=<img src={lv0}></img>
                break;
        }
        
        console.log("point: ", point-prevPoint+5);
        console.log("nextpoint: ", nextPoint-prevPoint);

        const modal=Modal.info({
            title: "Your Question grow your tree 3 point!",
            content: (
                <div style={{textAlign: "center"}}>
                    <Avatar size={120} icon={profileTree}></Avatar>
                    <Progress
                    strokeColor={{
                        '0%': '#108ee9',
                        '100%': '#87d068',
                    }}
                    percent={(point-prevPoint+5)/(nextPoint-prevPoint)*100}
                    style={{marginTop: 10}}
                    />
                    {nextPoint-point} points left to level up!
                </div>

            ),
            width: 500,
            centered: true,
            onCancel(){},
            okButtonProps: {style: {display: "none"}},
        });
        setTimeout(() => {
            modal.destroy();
        }, 3000);  
    }

    const handlePost = async() =>{
        const currentUser = await window.sessionStorage.getItem("id")
        console.log(currentUser)
        db.collection('QnAList').doc().set({key: 1, writer:currentUser, writing:writing, title:title, date: Date.now()});
        console.log('Uploaded a blob or file!');
        backend_Point(currentUser,"question");
        backend_WGO(currentUser,Date.now(),"question")
        handleModal();
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
                            <Link to={"/camp/2"} style={{fontSize: 18}}>UPLOAD</Link>
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
        getLevel: (point)=>{
            return getLevel(point);
        },
        getPrevPoint: (level)=>{
            return getPrevPoint(level);
        },
        getNextPoint: (level)=>{
            return getNextPoint(level);
        }    
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadQnA);