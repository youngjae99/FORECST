import React from 'react';
import { connect } from 'react-redux';
import lv0 from '../level_tree/lv0.png';
import lv1 from '../level_tree/lv1.png';
import lv2 from '../level_tree/lv2.png';
import lv3 from '../level_tree/lv3.png';
import {getLevel} from '../actions/authentication';
import PropTypes from 'prop-types';
import { db,storage } from "../firebase";

class Profile extends React.Component{

    constructor(props){
        super(props);

        this.state={
            point: 0,
        }
    }
    componentDidMount(){
        this.getMarker();
      }
  
      getMarker = async () => {
        console.log(this.props.writer);
        const snapshot = await db.collection('Users').doc(this.props.writer).get()
        console.log(snapshot)
        this.setState({point:snapshot.data().point})  
        }
  
    render(){
        // var point=this.state.point;
        var point=this.state.point;
        const level=this.props.getLevel(point);
        let currentTree=null;

        switch (level) {
            case 1:
                currentTree=<img src={lv1} style={{width: 90}}></img>
                break;
            case 2:
                currentTree=<img src={lv2} style={{width: 90}}></img>
                break;
            default:
                currentTree=<img src={lv0} style={{width: 90}}></img>
                break;
        }

        return(
            <div style={{fontWeight: 'Roboto'}}>
                <div>
                    {currentTree}
                </div>
                <div>
                    {this.props.writer}
                </div>
            </div>
        );
    }
}

Profile.propTypes={
    writer: PropTypes.string,
    point: PropTypes.number,
};

Profile.defaultProps={
    writer: 'Jisu',
    point: 0,
}

const mapStateToProps=(state)=>{
    return{
        status: state.authentication.status
    };
};

const mapDispatchToProps=(dispatch)=>{
    return{
        getLevel: (point)=>{
            return getLevel(point);
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);