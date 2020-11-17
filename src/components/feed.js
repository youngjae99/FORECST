import React, { Component } from 'react';
import { List, Button } from 'antd';
import { GiWateringCan } from 'react-icons/gi';
import { BsBookmark } from 'react-icons/bs';
import FeedComment from './feed  comment';

class Feed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            news: [],
        };
    }

    componentDidMount() {
        const url = `https://newsapi.org/v2/${this.props.news.type}?${this.props.news.query}&apiKey=56538f95cb824a6ca0acf842f60a5fed`;

        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.setState({
                    news: data.articles
                })
            })
            .catch((error) => console.log(error));
    }

    render(){
        return(
            <List
                itemLayout="vertical"
                size="large"
                dataSource={this.state.news}
                renderItem={item => (
                <div>
                    <img src={item.urlToImage} style={profileStyle} alt="profileimg"/>
                    <h3>{item.source.name}</h3>
                    <List.Item.Meta
                        title={<a href={item.href}>{item.title}</a>}
                        content={item.content}
                    />
                    <List.Item
                        key={item.title}
                        extra={
                            <img
                                style={postimgStyle}
                                alt="logo"
                                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                            />
                        }
                        actions={[
                        <GiWateringCan size="5%" color="1e71f7"/>,
                        <BsBookmark size="4%" color="6b6b6b"/>
                        ]}
                    />
                    {item.content}
                    <Button type="link">See more</Button>
                    <FeedComment></FeedComment>
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