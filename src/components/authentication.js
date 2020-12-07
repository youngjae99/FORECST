import React from 'react';
import PropTypes from 'prop-types';
import { Input, Modal, Card, Button, Form, Checkbox, Progress, Avatar } from 'antd';
import {Link} from 'react-router-dom';
import {browserHistory} from 'react-router';
import {backend_Join} from "../backend";
import { db } from "../firebase";
import { message} from 'antd';
import welcome from '../pages/template/images/welcome.png';

class Authentication extends React.Component{

    constructor(props){
        super(props);

        this.state={
            username: "",
            password: "",
            // Point Alert
            point: ""
        };

        this.handleChange=this.handleChange.bind(this);
        this.handleLogin=this.handleLogin.bind(this);
        this.handleRegister=this.handleRegister.bind(this);

        this.handleKeyPress = this.handleKeyPress.bind(this);
    }
    
    handleChange(e){
        let nextState={};
        nextState[e.target.name]=e.target.value;
        this.setState(nextState);
    }

    handleModal=()=>{
        const modal=Modal.info({
            title: "Welcome! Your tree grow 1 point!",
            content: (
                <img src={welcome} alt="wc" style={{ width: 400}}/>
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

    handleLogin= async ()=>{
        let id=this.state.username;
        console.log("user input id:", id);
        if(id===""||this.state.password===""){
            console.log("empty box");
            return;
        }
        else 
        {
            const wait = await db.collection('Users').doc(id).get()      
            console.log("user exist: ", wait.exists);
            if(wait.exists){
                this.props.onLogin(id,wait.data().newbie);
                window.sessionStorage.setItem('login', true); // Login 유지
                window.sessionStorage.setItem('id', id); // Login 유지 - id 저장
                {<Link to={"/campjoin"} style={{fontSize: 18}}></Link>}

                this.handleModal();
            }
            else
                message.error('User not exists!');
        }
    }

    handleRegister(){
        browserHistory.push('/login')
        backend_Join(this.state.username)
    }

    handleKeyPress(e) {
        if(e.charCode===13 ){
            if(this.props.mode) {
                this.handleLogin();
            } else {
                this.handleRegister();
            }
        }
    }

    render(){
        const layout={
            labelCol:{
                span:4,
            },
            wrapperCol:{
                span:18,
            },
        };

        const tailLayout={
            wrapperCol:{
                offset:4,
                span:18,
            },
        };

        const inputBoxes = (
            <div>
                <Form.Item
                label="Username"
                name="username"
                rules={[
                    {
                        required:true,
                        message: 'Please input your username.',
                    }
                ]}>
                    <Input
                    name='username'
                    type='text'
                    onChange={this.handleChange}
                    value={this.state.username}>
                    </Input>
                </Form.Item>

                <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                        required:true,
                        message: 'Please input your password.'
                    }
                ]}>
                    <Input.Password
                    name='password'
                    type='password'
                    onChange={this.handleChange}
                    value={this.state.password}
                    onKeyPress={this.handleKeyPress}>
                    </Input.Password>
                </Form.Item>
            </div>
        );
        
        const loginView=(
            <Form.Item {...tailLayout}>
                <Button type='primary' htmlType='submit' onClick={this.handleLogin} style={{marginTop: 10, marginLeft: 145}}>
                <div style={{fontSize: 18}}>Login</div> 
                {/* <div style={{fontSize: 18}}>Login</div> */}
                </Button>
                <br></br>
                <br></br>
                <p>Don't have an account yet? &nbsp;
                <Link to={"/register"}>Sign up</Link>
                </p>
            </Form.Item>
        );

        const registerView=(
            <div>
                <Form.Item {...tailLayout} valuePropName="checked">
                    <Checkbox>I agree to the Terms & Conditions and Privacy Policy</Checkbox>
                </Form.Item>

                <Form.Item {...tailLayout} valuePropName="checked">
                    <Checkbox>I agree to the Email Marketing Policy (optional)</Checkbox>
                </Form.Item>
                
                <Form.Item {...tailLayout}> 
                    <Button type='primary' htmlType='submit' onClick={this.handleRegister} style={{marginLeft: 110}}>
                        {this.state.password==='' ? 
                        <div style={{fontSize: 18}}>Create Account</div> : 
                        <Link to={"/login"} style={{fontSize: 18}}>Create Account</Link>}
                    </Button>
                </Form.Item>
            </div>
        );

        return(
            <Card style={{padding: 20, width: 600, height: 500, margin: "auto", marginTop: 50, fontFamily: 'Roboto'}}>
                <div style={{fontSize: 40, textAlign: "center", marginBottom: 60, paddingTop: 40}}>{this.props.mode ? "Sign in FORECST" : "Join FORECST"}</div>
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{
                        remember:true
                    }}
                    >
                        {inputBoxes}
                        {this.props.mode ? loginView : registerView}
                </Form> 
            </Card>
        );
    }
}

Authentication.propTypes={
    mode: PropTypes.bool,
    onLogin: PropTypes.func,
};

Authentication.defaultProps={
    mode: true,
    onLogin:(id, pw)=>{console.error("onLogin not defined");},
};

// Point Alert
const mapStateToProps=(state)=>{
    return{
        status: state.authentication.status
    };
};

const mapDispatchToProps=(dispatch)=>{
    return{
    };
};

export default Authentication;