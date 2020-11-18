import React from 'react';
import {Authentication, Forecst} from '../components'
import {loginRequest} from '../actions/authentication';
import {connect} from 'react-redux';

class Login extends React.Component{
    
    constructor(props){
        super(props);
        this.handleLogin=this.handleLogin.bind(this);
    }

    handleLogin(id){
        // console.log("handle login", id);

        this.props.loginRequest(id);

        if(this.props.status==="SUCCESS"){
            //create session data
            let loginData={
                isLoggedIn: true,
                username: id
            };

            document.cookie='key='+btoa(JSON.stringify(loginData));

            // console.log('is logged in: ', loginData.isLoggedIn);
            // console.log('username: ', loginData.username);

            return true;
        }
        else{
            return false;
        }
    }
    
    render(){
        return(
            <div>
                <Authentication mode={true}
                onLogin={this.handleLogin}/>
            </div>
        );
    }
};

const mapStateToProps=(state)=>{
    // console.log('map state to props:', state.authentication.login.status);

    return{
        status: state.authentication.login.status
    };
};

const mapDispatchToProps=(dispatch)=>{    
    return{
        loginRequest: (id)=>{
            // console.log('map dispatch to props:', id);

            return dispatch(loginRequest(id));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);