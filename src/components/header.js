import React from 'react';
import {Link} from 'react-router-dom';

const Header = () =>{
    return (
        <div>
            <Link to={"/"}>FORECST</Link>
            <Link to={"/authentication"}>JOIN</Link>
        </div>
    );
};

export default Header;