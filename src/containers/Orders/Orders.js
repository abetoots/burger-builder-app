import React, { Component } from 'react';
import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
//hoc
import { connect } from 'react-redux';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
class Orders extends Component {

    componentDidMount() {
        axios.get('/orders.json')
            .then(response => {
                const fetchedOrders = [];
                for (let key in response.data) {
                    fetchedOrders.push({
                        ...response.data[key],
                        id: key
                    });
                }
                this.setState({ loading: false, orders: fetchedOrders })
            })
            .catch(err => {
                this.setState({ loading: false })
            });
    }

    render() {
        return (
            <div>
                {this.state.orders.map(order => (
                    <Order
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price} />
                ))}
            </div>
        );
    }
};

const mapStateToProps = state => {

}

const mapDispatchToProps = dispatch => {

}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));