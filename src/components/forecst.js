import React from 'react';
import {Link} from 'react-router-dom';
import {Layout, Menu, Breadcrumb, Icon, Button} from 'antd';
import 'antd/dist/antd.css';
import PropTypes from 'prop-types'
import { render } from '@testing-library/react';

const { SubMenu } = Menu;
const { Header, Content, Sider, Footer } = Layout;

class Forecst extends React.Component{

    constructor(props){
        super(props);

        this.state={
            currentUser: ''
        };
    }
    
    render(){

        const joinButton=(
            <div className='right' style={{paddingRight:20}}>
                <Link to={"/authentication"} style={{color: '#000', marginRight: 20}}>Login</Link>
                <Button type='primary'>
                    <Link to={"/authentication"}>JOIN</Link>
                </Button>
            </div>
        );
    
        const mypageButton=(
            <div className='right' style={{paddingRight:20}}>
                <Link to={"/mypage"} style={{color: '#000', marginRight: 20}}>{this.props.currentUser}</Link>
            </div>
        );

        return (
            <nav style={{background: '#fff', padding: 0, boxShadow: 'none'}}>
                <Header style={{background: '#fff', padding:0}}>
    
                    <Link to={"/"} style={{marginLeft: 20, color: '#000'}}>FORECST</Link>
                    <Link style={{marginLeft: 20, color: '#000'}}>About US</Link>
    
                    {this.props.isLoggedIn ? mypageButton : joinButton}
                    
                </Header>
            </nav>
        );
    }
};

Forecst.propTypes={
    isLoggedIn: PropTypes.bool,
    currentUser: PropTypes.string
};

Forecst.defaultProps={
    isLoggedIn: true,
    currentUser: 'Youngjae'
};

export default Forecst;