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
        this.props.loginRequest(id);

        if(this.props.status==="SUCCESS"){
            this.props.history.push('/CS473_DesignProject');
            return true;

        }
        else
            return false;
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
    return{
        status: state.authentication.login.status
    };
};

const mapDispatchToProps=(dispatch)=>{    
    return{
        loginRequest: (id)=>{
            return dispatch(loginRequest(id));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);