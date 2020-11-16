import React, { Component } from 'react';
import FeedSingle from './feed single';

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

    renderItem() {
        return this.state.news.map((item) => (
            <FeedSingle key={item.url} item={item} />
        ));
    }
    render() {
        return (
            <div className="col-md-4">
                {this.renderItem()}
            </div>
        );
    }
}

export default Feed;