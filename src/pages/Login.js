import React from 'react';
import {Authentication} from '../components'
import {loginRequest} from '../actions/authentication';
import {connect} from 'react-redux';
import { message} from 'antd';
import { db,storage } from "../firebase";

class Login extends React.Component{
    
    constructor(props){
        super(props);
        this.state={new:true}

        this.handleLogin=this.handleLogin.bind(this);
    }
    // componentDidMount(){
    //     this.handle_newbie(window.sessionStorage.getItem("id"))
    // }
    // handle_newbie= async(id)=>{
    //     const wait = await db.collection('Users').doc(id).get()
    //     this.setState({new:wait.data().newbie})
    // }
    handleLogin(id,newbie){
        this.props.loginRequest(id);
        if(this.props.status==="SUCCESS"){
            console.log(this.props.isLoggedIn, id);
            if(newbie){
                this.props.history.push('/campjoin');
            }
            else{
                this.props.history.push('/camp');
            }
            return true;
        }
        else{
            // message.error('You should upload PICTURE!!');
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