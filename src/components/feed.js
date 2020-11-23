import React, { Component } from 'react';
import { List, Row, Col } from 'antd';
// import { GiWateringCan } from 'react-icons/gi';
// import { BsBookmark } from 'react-icons/bs';
import FeedComment from './feed  comment';
import Profile from './profile';

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
            style={{fontFamily: "Roboto", paddingBottom: 140}}
            itemLayout="vertical"
            size="large"
            dataSource={this.props.feed}
            renderItem={item => (

            <div style={{margin: 20, background: "#fff",
            padding:20, height: 400}}>
                <Row>
                    <Col span={3}>
                        <Profile></Profile>
                        <List.Item.Meta
                        title={item.data().title}
                        />
                    </Col>

                    <Col span={10} style={{paddingRight: 40}}>
                        <img src={item.data().photo}
                        style={{width: "100%", marginLeft: 0, padding: 20,
                        border: "solid", borderWidth: 0.5, height: 360}} alt="contentimage"/>
                        {/* <List.Item
                        key={item.data().title}
                        extra={
                            <img src={item.data().photo}
                            style={{margin: 0}} alt="contentimage"/>
                        }
                        actions={[
                        // <GiWateringCan size="5%" color="1e71f7"/>,
                        // <BsBookmark size="4%" color="6b6b6b"/>
                        ]}
                        /> */}
                    </Col>

                    <Col span={11}>
                        {item.data().writing}
                        {/* <Button type="link">See more</Button> */}
                        <FeedComment posting = {item.id} ></FeedComment>
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