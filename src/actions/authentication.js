import {
    AUTH_LOGIN,
    AUTH_LOGIN_SUCCESS,
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

export function getLevel(point){
    if(point<parseInt("10")){
        return 0;
    }else if(point<parseInt("30")){
        return 1;
    }else{
        return 2;
    }
}