import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    loading: false,
    checkoutFinished: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CHECKOUT_INIT:
            return {
                ...state,
                checkoutFinished: false
            }
        case actionTypes.PURCHASE_BURGER_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.id
            }
            return {
                ...state,
                loading: false,
                checkoutFinished: true,
                orders: state.orders.concat(newOrder)
            }
        case actionTypes.PURCHASE_BURGER_FAILED:
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
}

export default reducer;