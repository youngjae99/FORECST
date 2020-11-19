import React, { Component } from 'react';
import { List } from 'antd';

class WGO extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wgo: [],
        };
    }

    //componentDidMount() {
        // const url = `https://newsapi.org/v2/${this.props.news.type}?${this.props.news.query}&apiKey=56538f95cb824a6ca0acf842f60a5fed`;


        // fetch(url)
        //     .then((response) => {
        //         return response.json();
        //     })
        //     .then((data) => {
        //         this.setState({
        //             news: data.articles
        //         })
        //     })
        //     .catch((error) => console.log(error));
    //}

    render() {
        return (
            <List
                itemLayout="vertical"
                size="large"
                dataSource={this.props.wgo}
                renderItem={item => (
                    <div>
                        <img src={item.data().photo} style={typeimgStyle} alt="typeimg"/>
                        <h3>{item.data().title}</h3>
                        {item.data().writing}
                    </div>
                )}
        />
        );
    }
}

const typeimgStyle = {
    width: "30px",
    height: "30px"
}

export default WGO;