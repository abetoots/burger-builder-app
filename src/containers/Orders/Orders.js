import React, { Component } from 'react';
import axios from '../../axios-orders';
import * as actions from '../../store/actions/index';
//hoc
import { connect } from 'react-redux';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
//components
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
class Orders extends Component {

    componentDidMount() {
        this.props.initFetchOrders(this.props.token);
    }

    render() {
        let renderedComp = <Spinner />;
        if (!this.props.loading) {
            renderedComp =
                this.props.orders.map(order => (
                    <Order
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price} />
                ));
        }
        return (
            <div>
                {renderedComp}
            </div>

        );
    }
};

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        initFetchOrders: (token) => dispatch(actions.fetchOrders(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));