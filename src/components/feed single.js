import React from 'react';
import FeedComment from './feed  comment';
import styles from './feed single.css';

const FeedSingle = ({item}) => (
        
        <div className="post">
            <div className="intro">
                <img className="profile-img" src={item.urlToImage} alt="profile" style={profileStyle}></img>
                <span class="WGO-time">{item.source.name}</span>
                <h5 className ={styles.mainBody}>{item.title}</h5>
            </div>
            <div className="post-image">
                <img className="post-img-top" src={item.urlToImage} alt="post" style={postImgStyle}/>
                <span class="post-content">{item.content}</span>
            </div>
            
            <div className="post-action">
                <a href={item.url} className="btn btn-primary" target="_blank">See more...</a>
            </div>
            <FeedComment>
            </FeedComment>
        </div>
);

const profileStyle = {
    width: "60px",
    height: "60px"
}

const postImgStyle = {
    width: "400px",
    height: "400px"
}

export default FeedSingle;