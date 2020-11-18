import React from 'react';
import {Authentication} from '../components'
import { render } from '@testing-library/react';

class Login extends React.Component{
    
    constructor(props){
        super(props);
        this.handleLogin=this.handleLogin.bind(this);
    }

    handleLogin(id, pw){
    }
    
    render(){
        return(
            <div>
                <Authentication mode={true}
                onLogin={this.handleLogin}/>
                Login page
            </div>
        );
    }
};

export default Login;