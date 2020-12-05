import React from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'antd';
import campjoin from './template/images/details-2-office-team-work.svg';

class CampJoin extends React.Component{
    render(){
        return(
            <div style={{fontFamily: "Roboto", textAlign: "center"}}>
                <div style={{fontSize: 40, marginTop: 70, fontWeight: "bold"}}>
                    You are ready to go </div>
                <div style={{fontSize: 20, marginTop: 10}}>
                    Let’s start the hackathon in FORECST<br></br>Good luck!</div>
                <div>
                    <img src={campjoin} style={{width: 350, margin:"20px"}}></img>
                </div>
                <Link className="btn-solid-lg page-scroll" to="/CS473DesignProject-FORECST">
                      Go to Main page
                </Link>
            </div>
        )
    }
};

export default CampJoin;