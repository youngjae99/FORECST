import React from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'antd';
import campjoin from '../campjoin.png';

class CampJoin extends React.Component{
    render(){
        return(
            <div style={{fontFamily: "Roboto", textAlign: "center"}}>
                <div style={{fontSize: 50, marginTop: 70, fontWeight: "bold"}}>
                    You are ready to go </div>
                <div style={{fontSize: 25, marginTop: 10}}>
                    Let’s start the hackathon in FORECST<br></br>Good luck!</div>
                <div>
                    <img src={campjoin} style={{width: 500}}></img>
                </div>
                <Button type='primary' style={{marginTop: 10}}>
                    <Link to={"/CS473DesignProject-FORECST"} style={{fontSize: 18}}>Go to Main Page</Link>
                </Button>
            </div>
        )
    }
};

export default CampJoin;