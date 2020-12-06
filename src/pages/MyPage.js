import React from 'react';
import { IndividualPage } from '../components/index';

class MyPage extends React.Component{
    constructor(props){
        super(props);
        this.state={

        };
    }
    
    render(){
        return (
            <IndividualPage
            userName={this.props.location.pathname.split("/")[2]}>
                
            </IndividualPage>
        );
    }
};

export default MyPage;