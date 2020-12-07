import React from 'react';
import {Row, Col, Form, Input, Button, Select, Modal, Avatar, Progress} from 'antd';
import {Link, } from 'react-router-dom';
import {useEffect,useState} from 'react';
import {connect} from 'react-redux';
import { db,storage } from "../firebase";
import 'antd/dist/antd.css';
import {backend_Point,backend_WGO} from "../backend";
import { message} from 'antd';
import lv0 from '../level_tree/lv0.png';
import lv1 from '../level_tree/lv1.png';
import lv2 from '../level_tree/lv2.png';
import lv3 from '../level_tree/lv3.png';
import {getLevel, getPrevPoint, getNextPoint} from '../actions/authentication';

function PostUpload(props){
    console.log("upload post: ", window.sessionStorage.getItem("id"));
    const [inputs, setInputs] = useState({
        title: "",
        writing: "",
      });
      const [file, setFile] = useState(0);
      const [image,setImage] = useState(0);
      const [todolist, setTodolist] = useState([]);
      const [selectTodo, setSelectTodo] = useState("");
      const { title,writing } = inputs;
    
      const handleChange = e => {
        const { name, value } = e.target;
        setInputs({
             ...inputs, [name]: value });
      };
      const handleTodo = e => {
        console.log(e);
        console.log(e.label);
        setSelectTodo(e.label);
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
      const error2 = () => {
        message.error('You should select TODO!!');
      };
      

      useEffect(() => {
        getMyToDo();
        getMarker();
      },[])

    const getMyToDo = async () =>{
        const todo = await db.collection("Users").doc(window.sessionStorage.getItem("id")).collection("todo").where('check','==',false).get();
        setTodolist(todo.docs.map(doc=>doc.data().todo));
        console.log(todolist);
    }

    const handleOk=()=>{
        window.location.replace(`/mypage/${window.sessionStorage.getItem("id")}`);
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
        const level=props.getLevel(parseInt(point)+5);
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
            case 3:
                profileTree=<img src={lv3}></img>
            default:
                profileTree=<img src={lv0}></img>
                break;
        }
        
        console.log("point: ", point-prevPoint+5);
        console.log("nextpoint: ", nextPoint-prevPoint);

        var alert="";
        var alertPoint=parseInt(nextPoint)-parseInt(point)-5;

        switch(alertPoint){
            case 0: 
                alert="Congratulations! Level UP!";
                break;
            default:
                alert=alertPoint.toString()+" points left to level up!"
                break;
        }

        const modal=Modal.info({
            title: "Your Posting grow your tree 5 point!",
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
                    {alert}
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
        if(file == 0){
            error();
        }
        else if(todolist.length==0){
            error2();
        }
        else{
            if(props.newUser!="true"){
                handleModal();
            }

        const storageRef = storage.ref();
        const fileRef = storageRef.child(file.name);
        await fileRef.put(file)
        const currentUser = window.sessionStorage.getItem("id")
        console.log(currentUser)
            db.collection('Feeds').doc().set({id:currentUser,photo:await fileRef.getDownloadURL(),writing:writing,title:todolist[0],time: Date.now()});
            db.collection("Users").doc(currentUser).collection("todo").doc(todolist[0]).set({check:true, todo: todolist[0]});
            db.collection("Users").doc(currentUser).update("newbie",false);
            console.log('Uploaded a blob or file!');
            backend_Point(currentUser,"post")
            backend_WGO(currentUser,Date.now(),"post")
        }

        if(props.newUser=="true"){
            Modal.info({
                title: "Now, your first post is uploaded!",
                content: (
                    <div>
                        You can check your to-do list moved to completed.
                        <br></br> Also, you can check your tree point increased!
                        <div style={{float: "right", marginTop: 20}}>
                            <Button type="primary" onClick={handleOk}>
                                OKAY
                            </Button>
                        </div>
                    </div>  
                ),
                width: 500,
                centered: true,
                onCancel(){},
                okButtonProps: {style: {display: "none"}},
                });  
        }
    }

    const { Option } = Select;
    
    const map = todolist.map((word)=><Option>{word}</Option>)
    
    return(
        <div style={{fontFamily: "Roboto", width: 1000, margin: "auto", paddingTop: 20}}>
            <Row>
                <Col span={4}>
                    <div style={{fontSize: 24, fontWeight: "bold", textAlign: "right"}}>
                        Write a Post.
                    </div>
                </Col>
                <Col span={20}>
                    <div style={{fontSize: 24, marginLeft: 10}}>
                        freely share your thinking and what you did!
                    </div>
                </Col>
            </Row>
            <Row>
                <Col span={4}>
                    <div style={{fontSize: 18, marginTop: 20, textAlign: 'right', marginRight: 10}}>Choose a To-Do : </div>
                </Col>
                <Col>
                    <Select labelInValue placeholder="Please Select your To-Do :D" style={{ width: 300, marginTop: 20}} onChange={handleTodo}>
                        {map}
                    </Select>
                    <Button type="primary" style={{fontSize: 14, marginLeft: 10}}>
                        <Link to={{pathname: `/mypage/${window.sessionStorage.getItem("id")}`}}>
                            Add to-do list
                        </Link>
                    </Button>
                </Col>
            </Row>

            <Row>
                <Col span={4}>
                    <div style={{fontSize: 18, marginTop: 20, textAlign: "right", marginRight: 10}}>
                        Add a Picture:
                    </div>
                </Col>
                <Col span={20} style={{marginTop: 20}}>
                    <input type="file" name="file" onChange={handleImage}/>
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
                             {file==0||todolist.length==0?
                             <div style={{fontSize: 18}}>UPLOAD</div> :
                             <Link to={props.newUser==="true" ?  `/mypage/${window.sessionStorage.getItem("id")}`: "/camp"} style={{fontSize: 18}}>UPLOAD</Link>}
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

export default connect(mapStateToProps, mapDispatchToProps)(PostUpload);