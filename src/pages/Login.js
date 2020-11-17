import React from 'react';
import {Authentication, Forecst} from '../components'
import { render } from '@testing-library/react';

class Login extends React.Component{
    
    constructor(props){
        super(props);
        this.handleLogin=this.handleLogin.bind(this);
    }

    handleLogin(id, pw){
        console.log('handle login');
        return true;
    }
    
    render(){
        return(
            <div>
                <Forecst></Forecst>
                <Authentication mode={true}
                onLogin={this.handleLogin}/>
                {/* Login page */}
            </div>
        );
    }
};

export default Login;