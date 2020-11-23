import React, { Component } from 'react';
import { List } from 'antd';
import { db,storage } from "../firebase";
import postimg from '../post.png';
import questionimg from '../question.png';

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
    componentDidMount(){
        this.getWGO();
      }
      getWGO = async () => {
        const snapshot = await db.collection('WGO').get()  
            this.setState({wgo:snapshot.docs})  
        }
  
    render() {
        const logo =  (mode) =>{
            if(mode=="post")
                return postimg
            else if(mode=="question")
                return questionimg
        }
    
        return (
            <List
                itemLayout="vertical"
                size="large"
                dataSource={this.state.wgo}
                renderItem={item => (
                    <div style={{marginTop:"30px"}}>
                        <img src={logo(item.data().mode)} style = {typeimgStyle} />
                        {item.data().content}
                    </div>
                )}
        />
        );
    }
}

const typeimgStyle = {
    width: "20px",
    height: "20px",
    marginRight: "6px"
}

export default WGO;