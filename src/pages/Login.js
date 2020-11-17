import React from 'react';
import {Authentication} from '../components'
import { render } from '@testing-library/react';

class Login extends React.Component{
    render(){
        return(
            <div>
                <Authentication mode={true}></Authentication>
                Login page
            </div>
        );
    }
};

export default Login;