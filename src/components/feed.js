import React, { Component } from 'react';
import { List, Avatar } from 'antd';
import FeedComment from './feed comment';
import Profile from './profile';
import { connect } from 'react-redux';
import lv0 from '../level_tree/lv0.png';
import lv1 from '../level_tree/lv1.png';
import lv2 from '../level_tree/lv2.png';
import {getLevel} from '../actions/authentication';
import { db } from "../firebase";
import {Link} from 'react-router-dom';

class Feed extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            feed: [],
            point: 0,
        };
    }

    getPoints = async (id) => {
        const snapshot = await db.collection("Users").doc(id).get();
        console.log(snapshot.docs.map(doc=>doc.data()));
        return snapshot.data().point;
    }
    
    render(){
        var point=this.state.point;
        const level=this.props.getLevel(point);
        let currentTree=null;

        switch (level) {
            case 1:
                currentTree=<img src={lv1}></img>
                break;
            case 2:
                currentTree=<img src={lv2}></img>
                break;
            default:
                currentTree=<img src={lv0}></img>
                break;
        }

        return(
            <List
            style={{paddingBottom: 120}}
            itemLayout="vertical"
            size="large"
            pagination={{
            onChange: page => {
                console.log(page);
            },
            pageSize: 3,
            }}
            dataSource={this.props.feed}
            renderItem={item => (
            <List.Item
                style={{background: "#fff", marginTop: 10, borderRadius: "12px"}}
                key={item.title}
                extra={
                    <Avatar
                    shape="square"
                    icon={<img src={item.data().photo}></img>}
                    style={{width: 272, height: 250}}>
                    </Avatar>
                }
            >
                <List.Item.Meta
                avatar={<Profile
                writer={item.data().id}></Profile>}
                // title={<a href={item.href}>{item.data().id}</a>}
                title={<Link to={{pathname: `/mypage/${item.data().id}`}}>{item.data().id}</Link>}
                description={item.data().title}
                />
                {item.data().writing}
                <FeedComment posting = {item.id} id ={item.data().id}></FeedComment>
            </List.Item>
            )}
        />
        )}
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

export default connect(mapStateToProps, mapDispatchToProps)(Feed);