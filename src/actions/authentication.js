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
    }else if(point<parseInt("70")){
        return 2;
    }else{
        return 3;
    }
}

export function getPrevPoint(level){
    console.log("get prev point", level);

    if(parseInt(level)==1){
        return 10;
    }else if(parseInt(level)==2){
        return 30;
    }else if(parseInt(level)==3){
        return 70;
    }else{
        return 0;
    }
}

export function getNextPoint(level){
    if(parseInt(level)==1){
        return 30;
    }else if(parseInt(level)==2){
        return 70;
    }else if(parseInt(level)==3){
        return 270;
    }else{
        return 10;
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