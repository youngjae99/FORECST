import React from 'react';
import PropTypes from 'prop-types';
import { Input, Space, Card, Button, Form, Checkbox } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import {Link} from 'react-router-dom';
import { browserHistory } from 'react-router';

class Authentication extends React.Component{

    constructor(props){
        super(props);

        this.state={
            username: "",
            password: ""
        };

        this.handleChange=this.handleChange.bind(this);
        this.handleLogin=this.handleLogin.bind(this)
    }

    handleChange(e){
        let nextState={};
        nextState[e.target.name]=e.target.value;
        this.setState(nextState);
    }

    handleLogin(){
        let id=this.state.username;
        let pw=this.state.password;

        this.props.onLogin(id, pw).then(
            (success)=>{
                this.setState({
                    password:''
                });
            }
        )
    }

    render(){
        const layout={
            labelCol:{
                span:8,
            },
            wrapperCol:{
                span:16,
            },
        };

        const tailLayout={
            wrapperCol:{
                offset:8,
                span:16,
            },
        };

        const onFinish=(values)=>{
            console.log('Success:', values);
        };

        const onFinishFailed=(errorInfo)=>{
            console.log('Failed:', errorInfo);
        };

        const inputBoxes = (
            <div>
                <Form.Item
                label="Username"
                name="username"
                rules={[
                    {
                        required:true,
                        message: 'Please input your username.'
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
                    value={this.state.password}>
                    </Input.Password>
                </Form.Item>
            </div>
        );
        
        const loginView=(
            <Form.Item {...tailLayout}>
                <Button type='primary' htmlType='submit' onClick={this.handleLogin}>
                    Login
                </Button>
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
                    <Button type='primary' htmlType='submit'>
                        Create Account
                    </Button>
                </Form.Item>
            </div>
        );

        return(
            <Card>
                <div>{this.props.mode ? "LOGIN FORECST" : "JOIN FORECST"}</div>
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{
                        remember:true
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}>
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

export default Authentication;