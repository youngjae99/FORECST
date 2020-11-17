import React from 'react';
import FeedComment from './feed  comment';

const FeedSingle = ({item}) => (
        
        <div className="post">
            <div className="intro">
                <img className="profile-img" src={item.urlToImage}></img>
                아이디
                <h5>{item.title}</h5>
            </div>
            <div className="post-image">
                <img className="post-img-top" src={item.urlToImage} alt="post image" />
                <span class="post-content">{item.content}</span>
            </div>
            
            <div className="post-action">
                <a href={item.url} className="btn btn-primary" target="_blank">See more...</a>
            </div>
            <FeedComment>
                
            </FeedComment>
        </div>
);

export default FeedSingle;