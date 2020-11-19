import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types'
import { render } from '@testing-library/react';
import { PageHeader, Button } from 'antd';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { Toast } from 'antd-mobile'

class camptitlebar extends React.Component{

    constructor(props){
        super(props);

        this.state={
            currentUser: ''
        };
    }
    
    render(){
        
        return (
            <div style>
                Title
            </div>
        );
    }
};


export default camptitlebar;