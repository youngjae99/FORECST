import React from 'react';
import {Authentication, Forecst} from '../components'
import { render } from '@testing-library/react';

class Register extends React.Component{
    render(){
        return(
            <div>
                <Authentication mode={false}></Authentication>
            </div>
        );
    }
};

export default Register;