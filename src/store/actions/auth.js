import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authenticateStart = () => {
    return {
        type: actionTypes.AUTHENTICATE_START
    }
}

export const authenticateSuccess = (idToken, localId) => {

    return {
        type: actionTypes.AUTHENTICATE_SUCCESS,
        idToken: idToken,
        localId: localId
    }
}

export const authenticateFailed = err => {
    return {
        type: actionTypes.AUTHENTICATE_FAILED,
        error: err
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTHENTICATE_LOGOUT
    }
}

export const setAuthRedirectPath = path => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const checkAuthTimeout = expiryData => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expiryData * 1000)
    }
}

export const authenticateUser = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authenticateStart());
        /**
         * Our payload
         * @link https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
         */
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        /**
         * We want to post to different urls depending if we are on signup or login
         */
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyA1mKj1w0UEKSstj12Z8wK1xm1nb7Qksiw';
        if (!isSignup) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyA1mKj1w0UEKSstj12Z8wK1xm1nb7Qksiw';
        }
        axios.post(url, authData)
            .then(response => {
                const expiryData = response.data.expiresIn * 1000;
                const expirationDate = new Date(new Date().getTime() + expiryData);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId);
                dispatch(authenticateSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(err => {
                dispatch(authenticateFailed(err.response.data.error));
            });

        // const headers = {
        //     credentials: 'same-origin', // 'include', default: 'omit'
        //     method: 'POST',             // 'GET', 'PUT', 'DELETE', etc.
        //     body: JSON.stringify(authData), // Use correct payload (matching 'Content-Type')
        //     headers: { 'Content-Type': 'application/json' },
        // };
        // fetch(url, headers)
        //     .then(response => response.json())
        //     .then(data => {
        //         console.log(data);
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     })
    }
}

export const checkAuthentication = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            //although logically, we can just return here
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            //check if we're already past the expiry date
            if (expirationDate < new Date()) {
                dispatch(logout());
            }
            const userId = localStorage.getItem('userId');
            dispatch(authenticateSuccess(token, userId));
            //remaining seconds actually, converted to ms since checkAuthTimeout multiplies the param by 1000
            const remainingTime = (expirationDate.getTime() - new Date().getTime()) / 1000;
            dispatch(checkAuthTimeout(remainingTime));
        }
    }
}