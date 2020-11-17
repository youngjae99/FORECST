import React from 'react';

const WGOSingle = ({item}) => (
        <div className="one WGO">
            <img className="WGO type-img" src={item.urlToImage} alt="WGO type img" style={typeImgStyle}></img>
            <h5>{item.title}</h5>
            <span class="WGO-time">56 sec ago</span>
        </div>
);

const typeImgStyle = {
    width: "40px",
    height: "40px"
}

export default WGOSingle;