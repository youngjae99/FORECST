import React, { Component } from 'react';
import { List, Button } from 'antd';
import { GiWateringCan } from 'react-icons/gi';
import { BsBookmark } from 'react-icons/bs';
import FeedComment from './feed  comment';

class Feed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            feed: []
        };
    }

    componentDidMount() {
        // const url = `https://newsapi.org/v2/${this.props.feed.type}?${this.props.feed.query}&apiKey=56538f95cb824a6ca0acf842f60a5fed`;
        // fetch(url)
        //     .then((response) => {
        //         return response.json();
        //     })
        //     .then((data) => {
        //         this.setState({
        //             feed: data.articles
        //         })
        //         console.log(this.state)
        //     })
        //     .catch((error) => console.log(error));
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
                            <img src={item.data().photo} style={postimgStyle} alt="contentimage"/>
                        }
                        actions={[
                        <GiWateringCan size="5%" color="1e71f7"/>,
                        <BsBookmark size="4%" color="6b6b6b"/>
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