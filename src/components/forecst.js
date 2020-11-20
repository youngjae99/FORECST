import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types'
import { PageHeader, Button, Avatar, Row, Col } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import logo from '../logo.png';


class Forecst extends React.Component{

    constructor(props){
        super(props);

        this.state={
            currentUser: ''
        };

        this.handleHome=this.handleHome.bind(this);
    }

    handleHome(){
        this.props.history.push('/CS473_DesignProject');
    }
    
    render(){
        const joinButton=(
            <PageHeader
            ghost={false}
            extra={[
                <Link to={"/login"} style={{color: '#000', marginRight: 20, fontSize: 18,}}>Login</Link>,
                <Button type='primary'>
                    <Link to={"/register"} style={{fontSize: 18}}>JOIN</Link>
                </Button>
            ]}
            />
        );

        const mypageButton=(
            <PageHeader
            ghost={false}
            extra={[
                <Link to={"/mypage"}style={{color: '#000', fontSize: 18}}>{this.props.currentUser}</Link>,
                <Avatar size={30} icon={<UserOutlined></UserOutlined>}></Avatar>
            ]}
            />
        );

        return (
            <div style={{fontFamily: "Roboto"}}>
                <Row>
                    <Col span={3}>
                        <a>
                            <img src={logo} style={{width: 100, marginTop: 20, marginLeft: 10}} onClick={this.handleHome}></img>
                        </a>
                    </Col>
                    <Col span={21}>
                        {this.props.isLoggedIn ? mypageButton : joinButton}              
                    </Col>
                </Row>
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

export default withRouter(Forecst);