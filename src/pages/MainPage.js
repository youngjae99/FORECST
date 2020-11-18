import React from 'react';
import {Forecst, Menu} from '../components';
import {Link} from 'react-router-dom';


const MainPage = () =>{
    return (<div>
        <Forecst></Forecst>

            <Link to={"/camp"} style={{color: '#000', marginRight: 20}}>Go to Camp</Link>

        </div>
    );
};

export default MainPage;