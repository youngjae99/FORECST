import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Button} from 'antd';


class MainPage extends React.Component{

    constructor(props){
        super(props)
    }

    render(){
        const joinButton=(
            <Button type='primary'>
                <Link to={"/camphome"} style={{fontSize: 18}}>Join Now</Link>
            </Button>
        )

        const goButton=(
            <Button type='primary'>
                <Link to={"/register"} style={{fontSize: 18}}>Go to Hackathon</Link>
            </Button>
        )

        return(
            <div style={{fontFamily: "Roboto"}}>
                {this.props.status.isLoggedIn ? joinButton : goButton}
            </div>
        );
    }
};


const mapStateToProps=(state)=>{
    return{
        status: state.authentication.status
    };
};

const mapDispatchToProps=(dispatch)=>{
    return{
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);