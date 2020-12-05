import React from 'react';
import { IndividualPage } from '../components/index';

class MyPage extends React.Component{

    render(){
        return (
            <IndividualPage
            userName={this.props.location.pathname.split("/")[2]}>
            </IndividualPage>
        );
    }
};

export default MyPage;