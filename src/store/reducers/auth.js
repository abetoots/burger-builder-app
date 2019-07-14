import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utility/utility';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    /**
     * Used to dynamically set the redirect path in Auth component
     * Why:
     * When the user is not authenticated, started building a burger,
     * clicked 'sign up to order now', reached Authenticate page,
     * we make sure that the user is redirected to 'checkout'
     * 
     * Otherwise, if they reached the Authenticate page first, the user
     * is always redirected to homepage
     */
    authRedirectPath: '/'
}

const authStart = (state, action) => {
    return updateObject(state, { error: null, loading: true })
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.idToken,
        userId: action.localId,
        error: null,
        loading: false,
    })
}

const authFailed = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    })
}

const authLogout = (state, action) => {
    return updateObject(state, {
        token: null,
        userId: null,
    })
}

const setAuthRedirectPath = (state, action) => {
    return updateObject(state, { authRedirectPath: action.path })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTHENTICATE_START: return authStart(state, action);
        case actionTypes.AUTHENTICATE_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTHENTICATE_FAILED: return authFailed(state, action);
        case actionTypes.AUTHENTICATE_LOGOUT: return authLogout(state, action);
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action);
        default: return state;
    }
}

export default reducer;