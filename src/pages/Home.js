import React from 'react';
import {Forecst, Menu} from '../components';
import {getStatusRequest} from '../actions/authentication';
import {connect} from 'react-redux';


class Home extends React.Component{

    constructor(props){
        super(props);
    }

    componentDidMount(){
        // get cookie by name
        function getCookie(name){
            var value=";"+document.cookie;
            var parts=value.split(";"+name+"=");
            if(parts.length===2) return parts.pop().split(";").shift();
        }

        // get loginData from cookie
        let loginData=getCookie('key');

        // if loginData is undefined, do nothing
        if(typeof loginData==="undefined") return;

        // decode base64 & parse json
        loginData=JSON.parse(atob(loginData));

        // if not logged in. do nothing
        if(!loginData.isLoggedIn) return;

        // page refreshed & has a session in cookie
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