import React, { Component } from 'react';
import { List, Button, Row, Col } from 'antd';
// import { GiWateringCan } from 'react-icons/gi';
// import { BsBookmark } from 'react-icons/bs';
import FeedComment from './feed  comment';

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
                itemLayout="vertical"
                size="large"
                dataSource={this.props.feed}
                renderItem={item => (
                <div>
                    <Row>
                        <Col span={4}>
                            Profile
                        </Col>
                        <Col span={8}>
                            Photo
                        </Col>
                        <Col span={12}>
                            Explanation
                            <FeedComment posting = {item.id} ></FeedComment>
                        </Col>
                    </Row>
                    {/* <img src={item.data().photo} style={profileStyle} alt="profileimg"/>
                    <h3>{item.data().id}</h3>

                    <List.Item.Meta
                        title={item.data().title}
                        // content={item.data().writing}
                    />

                    <List.Item
                        key={item.data().title}
                        extra={
                            <img src={item.data().photo} style={profileStyle} alt="contentimage"/>
                        }
                        actions={[
                        // <GiWateringCan size="5%" color="1e71f7"/>,
                        // <BsBookmark size="4%" color="6b6b6b"/>
                        ]}
                    />

                    {item.data().writing}
                    <Button type="link">See more</Button>
                    <FeedComment posting = {item.id} ></FeedComment> */}
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