import {
    AUTH_LOGIN,
    AUTH_LOGIN_SUCCESS,
} from './ActionTypes'

/** AUTHENTICATION */
export function loginRequest(username){
    console.log('login request', username);

    // API REQUEST
    return(dispatch)=>{
        // inform login API is starting
        dispatch(login());
        
        // API REQUEST
        return dispatch(loginSuccess(username))
    };

    // // API REQUEST
    // return axios.post('/routes/account/login', { email, password }) //loginRequest가 실행되면 thunk함수의 인자를 post에 전송
    // .then((response) => {
    //     // SUCCEED
    //     const data = response.data.data[0];
    //     const name = data.name;
    //     const department = data.department;
        
    //     dispatch(loginSuccess(email, name, department));
    // }).catch((error) => {
    //     // FAILED
    //     dispatch(loginFailure());
    // });
}

export function login() {
    return {
        type: AUTH_LOGIN
    };
}

export function loginSuccess(username) {
    return {
        type: AUTH_LOGIN_SUCCESS,
        username
    };
}