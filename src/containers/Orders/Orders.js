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
        this.props.initFetchOrders();
    }

    render() {
        let renderedComp = <Spinner />;
        if (!this.props.loading) {
            renderedComp = <div>
                {this.state.orders.map(order => (
                    <Order
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price} />
                ))}
            </div>
        }
        return (
            { renderedComp }
        );
    }
};

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        initFetchOrders: () => dispatch(actions.fetchOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));