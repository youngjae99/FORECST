import React, { Component } from 'react';
import { List, Button, Row, Col } from 'antd';
// import { GiWateringCan } from 'react-icons/gi';
// import { BsBookmark } from 'react-icons/bs';
import FeedComment from './feed  comment';
import Profile from './profile'

class Feed extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            feed: []
        };
    }
    
    render(){
        return(
            <List
            style={{paddingBottom: 140}}
            itemLayout="vertical"
            size="large"
            dataSource={this.props.feed}
            renderItem={item => (
            <div style={{margin: 20, background: "#fff", padding: 20}}>
                <Row>
                    <Col span={3}>
                        <Profile
                        writer={item.data().id}></Profile>
                        <List.Item.Meta
                        title={item.data().title}
                        content={item.data().writing}
                        />
                    </Col>

                    <Col span={10} 
                    style={{paddingRight: 40}}
                    >
                        <img src={item.data().photo} 
                        style={{width: "100%", 
                        padding: 10
                        // border: "solid", borderWidth: 0.5
                        }} alt="contentimage"/>
                    </Col>

                    <Col span={11}>
                        {item.data().writing}
                        {/* <Button type="link">See more</Button> */}
                        <FeedComment posting = {item.id} id ={item.data().id} ></FeedComment>
                    </Col>
                </Row>
            </div>
            )}
            />
        )}
}

const profileStyle = {
    width: "60px",
    height: "60px"
}

const postimgStyle = {
    width: "300px",
    height: "300px"
}

export default Feed;