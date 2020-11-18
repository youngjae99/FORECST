import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types'
import { PageHeader, Button, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import {createBrowserHistory} from 'history';

const browserHistory=createBrowserHistory();

class Forecst extends React.Component{

    constructor(props){
        super(props);

        this.state={
            currentUser: ''
        };
    }

    handleHome(){
        console.log('handleHome');
        browserHistory.push('/');
    }
    
    render(){
        const joinButton=(
            <PageHeader
            ghost={false}
            backIcon="FORECST"
            onBack={()=>this.handleHome()}
            extra={[
                <Link to={"/login"} style={{color: '#000', marginRight: 20}}>Login</Link>,
                <Button type='primary'>
                    <Link to={"/register"}>JOIN</Link>
                </Button>
            ]}
            />
        );
    
        const mypageButton=(
            <PageHeader
            ghost={false}
            backIcon="FORECST"
            onBack={()=>this.handleHome()}
            extra={[
                <Link to={"/mypage"} style={{color: '#000'}}>{this.props.currentUser}</Link>,
                <Avatar size={35} icon={<UserOutlined></UserOutlined>}></Avatar>
            ]}
            />
        );

        return (
            <div>
                {this.props.isLoggedIn ? mypageButton : joinButton}              
            </div>
        );
    }
};

Forecst.propTypes={
    isLoggedIn: PropTypes.bool,
    currentUser: PropTypes.string
};

Forecst.defaultProps={
    isLoggedIn: false,
    currentUser: 'Youngjae'
};

export default Forecst;