import React from 'react';

const WGOSingle = ({item}) => (
        <div className="card">
            <div className="card-image">
                <h5>{item.title}</h5>
                <span class="post-title">{item.source.name}</span>
            </div>
        </div>
);

export default WGOSingle;