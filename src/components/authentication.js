import React from 'react';
import PropTypes from 'prop-types';
import { Input, Space } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

class Authentication extends React.Component{

    constructor(props){
        super(props);

        this.state={
            username: "",
            password: ""
        };
    }

    render(){

        const inputBoxes = (
            <Space direction="vertical">
                <Input placeholder="username"></Input>
                <Input.Password
                placeholder="password"
                iconRender={visible=>(visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}>
                </Input.Password>
            </Space>
        );
        
        const loginView=(
            <div>loginView</div>
        );

        const registerView=(
            <div>registerView</div>
        );

        return(
            <div>
                <div>{this.props.mode ? "LOGIN FORECST" : "JOIN FORECST"}</div>
                {inputBoxes}
                <div>{this.props.mode ? loginView : registerView}</div>
            </div>
        );
    }
}

Authentication.propTypes={
    mode: PropTypes.bool
};

Authentication.defaultProps={
    mode: true
};

export default Authentication;