import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utility/utility';

const initialState = {
    orders: [],
    loading: false,
    checkoutFinished: false
};

const purchaseBurgerSuccess = (state, action) => {
    const newOrder = updateObject(action.orderData, { id: action.id });
    return updateObject(state, {
        loading: false,
        checkoutFinished: true,
        orders: state.orders.concat(newOrder)
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CHECKOUT_INIT:
            return updateObject(state, { checkoutFinished: false });
        case actionTypes.PURCHASE_BURGER_START:
            return updateObject(state, { loading: true });
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            return purchaseBurgerSuccess(state, action);
        case actionTypes.PURCHASE_BURGER_FAILED:
            return updateObject(state, { loading: false });
        case actionTypes.FETCH_ORDERS_START:
            return updateObject(state, { loading: true });
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return updateObject(state, { orders: action.orders, loading: false });
        case actionTypes.FETCH_ORDERS_FAILED:
            return updateObject(state, { loading: false });
        default:
            return state;
    }
}

export default reducer;