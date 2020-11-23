import {
    AUTH_LOGIN,
    AUTH_LOGIN_SUCCESS,

    VOTE,
    VOTE_SUCCESS,
} from './ActionTypes'

/** AUTHENTICATION */
export function loginRequest(username){
    // console.log('login request', username);
    // API REQUEST
    return(dispatch)=>{
        // inform login API is starting
        dispatch(login());
        
        // API REQUEST
        return dispatch(loginSuccess(username))
    };
}

export function login() {
    return {
        type: AUTH_LOGIN
    };
}

export function loginSuccess(username) {
    // console.log('login success', username);
    return {
        type: AUTH_LOGIN_SUCCESS,
        username
    };
}

/** GET LEVEL */
export function getLevel(point){
    if(point<parseInt("10")){
        return 0;
    }else if(point<parseInt("30")){
        return 1;
    }else{
        return 2;
    }
}

/** VOTE */
export function voteRequest(){
    return (dispatch)=>{
        dispatch(vote());

        return dispatch(voteSuccess());
    }
}

export function vote() {
    return {
        type: VOTE
    };
}

export function voteSuccess() {
    // console.log('login success', username);
    return {
        type: VOTE_SUCCESS,
    };
}