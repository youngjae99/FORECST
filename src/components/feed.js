import React, { Component } from 'react';
import { List, Button, Avatar, Space } from 'antd';
// import { GiWateringCan } from 'react-icons/gi';
// import { BsBookmark } from 'react-icons/bs';
import FeedComment from './feed  comment';
import {backend_Feed_watering} from "../backend";

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
                    <img src={item.data().photo} style={profileStyle} alt="profileimg"/>
                    <h3>{item.data().id}</h3>
                    <List.Item.Meta
                        title={item.data().title}
                        content={item.data().writing}
                    />
                    <List.Item
                        key={item.data().title}
                        extra={
                            <img src={item.data().photo} style={profileStyle} alt="contentimage"/>
                        }
                        actions={[
                        //물주기 버튼 눌렀을 때 피드에 있는 모든 post에 적용되는 점, 한번 밖에 누르지 못하는 점 fix해야됨
                        <Button  onClick={backend_Feed_watering(item.id,item.data().id)}>watering</Button>
                        // <GiWateringCan size="5%" color="1e71f7" onclick={backend_Point(item.data().id,"watered")}  />,
                        // <BsBookmark size="4%" color="6b6b6b"/>
                        ]}
                    />
                    {item.data().writing}
                    <Button type="link">See more</Button>
                    <FeedComment posting = {item.id} ></FeedComment>
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