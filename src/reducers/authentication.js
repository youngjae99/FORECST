import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const initialState={
    login:{
        status: 'INIT'
    },
    status:{
        isLoggedIn: false,
        currentUser: '',
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

        default:
            return state;
    }
}