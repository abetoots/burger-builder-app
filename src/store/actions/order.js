import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const checkoutInit = () => {
    return {
        type: actionTypes.CHECKOUT_INIT
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        id: id,
        orderData: orderData
    }
}

export const purchaseBurgerFailed = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAILED
    }
}

export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json', orderData)
            .then(response => {
                // console.log(response);
                dispatch(purchaseBurgerSuccess(response.data.id, response.data));
            })
            .catch(error => {
                // console.log(error);
                dispatch(purchaseBurgerFailed());
            });
        // console.log(this.props.ingredients);
    }
}

export const fetchOrdersSuccess = orders => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrdersFailed = error => {
    return {
        type: actionTypes.FETCH_ORDERS_FAILED,
        error: error
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrders = () => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        axios.get('/orders.json')
            .then(response => {
                const fetchedOrders = [];
                for (let key in response.data) {
                    fetchedOrders.push({
                        ...response.data[key],
                        id: key
                    });
                }
                dispatch(fetchOrdersSuccess(fetchOrders));
            })
            .catch(err => {
                dispatch(fetchOrdersFailed(err));
            });
    }
}