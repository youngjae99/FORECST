import React from 'react';
import PropTypes from 'prop-types';
import {Input, Card, Button, Form, Checkbox} from 'antd';
import {Link} from 'react-router-dom';
import {browserHistory} from 'react-router';

class Authentication extends React.Component{

    constructor(props){
        super(props);

        this.state={
            username: "",
            password: ""
        };

        this.handleChange=this.handleChange.bind(this);
        this.handleLogin=this.handleLogin.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleChange(e){
        let nextState={};
        nextState[e.target.name]=e.target.value;
        this.setState(nextState);
    }

    handleLogin(){
        let id=this.state.username;

        if(id===""||this.state.password==="")
            return;
        else this.props.onLogin(id);
    }

    handleRegister(){
        browserHistory.push('/login')
    }

    handleKeyPress(e) {
        if(e.charCode ===13 ){
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
                {this.state.password=='' ? 
                <div style={{fontSize: 18}}>Login</div> : 
                <Link to={"/"} style={{fontSize: 18}}>Login</Link>}
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
                    <Button type='primary' htmlType='submit' onClick={this.handleRegister} style={{marginLeft: 110}}>
                        {this.state.password=='' ? 
                        <div style={{fontSize: 18}}>Create Account</div> : 
                        <Link to={"/login"} style={{fontSize: 18}}>Create Account</Link>}
                    </Button>
                </Form.Item>
            </div>
        );

        return(
            <Card style={{padding: 20, width: 600, height: 500, margin: "auto", marginTop: 50, fontFamily: 'Roboto'}}>
                <div style={{fontSize: 40, textAlign: "center", marginBottom: 60, paddingTop: 40}}>{this.props.mode ? "LOGIN FORECST" : "JOIN FORECST"}</div>
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

export default Authentication;