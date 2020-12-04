import React from 'react';
import {Card, Avatar, Row, Col, Tabs, Slider, Button, List, Input, Form} from 'antd';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import lv0 from '../level_tree/lv0.png';
import lv1 from '../level_tree/lv1.png';
import lv2 from '../level_tree/lv2.png';
import lv3 from '../level_tree/lv3.png';
import {getLevel} from '../actions/authentication';
import {MyFeed} from '../components';
import { db } from "../firebase";
import PropTypes from "prop-types";
import { IndividualPage } from '../components/index';


const {TabPane}=Tabs;

const Editor = ({ onChange, value}) => (
    <>
      <Form.Item>
        <Input
            type='text'
            onChange={onChange}
            value={value}>
        </Input>
      </Form.Item>
      <Button>Add to-do</Button>
    </>
  );

class MyPage extends React.Component{

    //my view 보여주는 코드가 필요함
    render(){
        return (
            <IndividualPage
            userName={this.props.location.pathname.split("/")[2]}>
            </IndividualPage>
        );
    }
};

export default MyPage;
