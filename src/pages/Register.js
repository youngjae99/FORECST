import React from 'react';
import {Authentication} from '../components'
import { render } from '@testing-library/react';

class Register extends React.Component{
    render(){
        return(
            <div>
                <Authentication mode={false}></Authentication>
                Register page
            </div>
        );
    }
};

export default Register;