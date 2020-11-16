import React from 'react';

const FeedSingle = ({item}) => (
        
        <div className="post">
            <div className="post-image">
                <h5>{item.title}</h5>
                <img className="post-img-top" src={item.urlToImage} alt={item.title} />
                <span class="post-title">{item.source.name}</span>
            </div>
            
            <div className="post-action">
                <a href={item.url} className="btn btn-primary" target="_blank">See more...</a>
            </div>
        </div>
);

export default FeedSingle;