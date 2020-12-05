import React from 'react';
import {Row, Col, Form, Input, Button, Select, List} from 'antd';
import {Link, } from 'react-router-dom';
import {useEffect,useState} from 'react';
import {connect} from 'react-redux';
import firebase from "firebase/app";

import { db,storage } from "../firebase";
import 'antd/dist/antd.css';
import PropTypes from 'prop-types'
import { render } from '@testing-library/react';
import {backend_Point,backend_WGO} from "../backend";
import { message} from 'antd';
import { PostUpload } from '../components/index';

function UploadPost(props){
    return(
        <PostUpload
        newUser={props.location.pathname.split("/")[2]}></PostUpload>
    );
}

const mapStateToProps=(state)=>{
    return{
        status: state.authentication.status
    };
};

const mapDispatchToProps=(dispatch)=>{
    return{
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadPost);