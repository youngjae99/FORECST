import React, { Component } from 'react';
import { List, Button } from 'antd';
import { GiWateringCan } from 'react-icons/gi';
import { BsBookmark } from 'react-icons/bs';
import FeedComment from './feed  comment';
import { db,storage } from "../firebase";

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
        var lists =[];
        const handleDownload = () => {

            db.collection('Feeds').get().then(function(querySnapshot){
              querySnapshot.forEach(function(doc){
                  console.log(doc.data());
                  lists.push(doc.data());
                  this.setState({feed:this.state.feed.concat(doc.data())});

              })
            })
            console.log(lists);
            console.log(this.state.feed);
          }
        handleDownload();
    }

    render(){
        return(
            <List
                itemLayout="vertical"
                size="large"
                dataSource={this.state.feed}
                renderItem={item => (
                <div>
                    <img src={item.photo} style={profileStyle} alt="profileimg"/>
                    <h3>{'Id'}</h3>
                    <List.Item.Meta
                        title={item.title}
                        content={item.writing}
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
                    {item.writing}
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