import React from 'react';
import {Forecst} from '../components';
import {connect} from 'react-redux';


class Home extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <Forecst 
                isLoggedIn={this.props.status.isLoggedIn}
                currentUser={this.props.status.currentUser}>
                </Forecst>
            </div>
        );
    }
}

const mapStateToProps=(state)=>{
    return{
        status: state.authentication.status
    };
};

const mapDispatchToProps=(dispatch)=>{
    return{
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);