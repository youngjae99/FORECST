import React from 'react';
import {Authentication, Forecst} from '../components'
import { render } from '@testing-library/react';

class Register extends React.Component{
    render(){
        return(
            <div>
                <Forecst></Forecst>
                <Authentication mode={false}></Authentication>
                {/* Register page */}
            </div>
        );
    }
};

export default Register;