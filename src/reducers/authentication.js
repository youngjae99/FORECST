import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';
import { PageHeader } from '../../node_modules/antd/lib/index';

const initialState={
    login:{
        status: 'INIT'
    },
    vote:{
        status: 'INIT'
    },
    status:{
        isLoggedIn: false,
        currentUser: '',
        isVoted: false,
    }
};

export default function authentication(state, action){
    if(typeof state=="undefined")  
        state=initialState;
    
    switch(action.type){
        /** LOGIN */
        case types.AUTH_LOGIN:
            return update(state, {
                login: {
                    status: {$set: 'WAITING'}
                }
            });
        
        case types.AUTH_LOGIN_SUCCESS:
            // console.log('auth login success');

            return update(state, {
                login: {
                    status: {$set: 'SUCCESS'}
                },
                status: {
                    isLoggedIn: {$set: true},
                    currentUser: {$set: action.username}
                }
            });

        /** VOTE */
        case types.VOTE:
            return update(state, {
                vote: {
                    status: {$set: 'WAITING'}
                }
            });
        
        case types.VOTE_SUCCESS:
            // console.log('vote success');

            return update(state, {
                vote: {
                    status: {$set: 'SUCCESS'}
                },
                status: {
                    isVoted: {$set: true},
                }
            });
        
        default:
            return state;
    }
}