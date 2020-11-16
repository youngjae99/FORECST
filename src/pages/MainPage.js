import React from 'react';
import {Header, Menu} from '../components';
import {Link} from 'react-router-dom';


const MainPage = () =>{
    return (
        <div>
            <Header>

            </Header>
            <Link to={"/camphome"}>GotoCamp</Link>
        </div>
    );
};

export default MainPage;