import React from 'react';
import {Link} from 'react-router-dom';

const Menu = () =>{
    return (
        <div>
            <div>Camp: Make an application for the pandemic COVID 19 situation!</div>  
            <Link to={"/camphome"}>Home</Link>
            <Link to={"/campqna"}>QnA Board</Link>
            <Link to={"/camprank"}>Ranking</Link>
        </div>
    );
};

export default Menu;