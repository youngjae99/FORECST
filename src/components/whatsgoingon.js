import React, { Component } from 'react';
import { List } from 'antd';

class WGO extends Component {
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

    render() {
        return (
            <List
                itemLayout="vertical"
                size="large"
                dataSource={this.state.news}
                renderItem={item => (
                    <div>
                        <img src={item.urlToImage} style={typeimgStyle} alt="profileimg"/>
                        <h3>{item.source.name}</h3>
                        {item.content}
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