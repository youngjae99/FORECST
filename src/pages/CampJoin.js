import React from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'antd';

class CampJoin extends React.Component{
    render(){
        return(
            <div style={{fontFamily: "Roboto"}}>
                <div>You are ready to go</div>
                <div>Let’s start the hackathon in FORECST<br></br>Good luck!</div>
                <Button type='primary'>
                    <Link to={"/CS473_DesignProject"} style={{fontSize: 18}}>Go to Main Page</Link>
                </Button>
            </div>
        )
    }
};

export default CampJoin;