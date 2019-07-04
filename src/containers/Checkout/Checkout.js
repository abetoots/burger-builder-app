import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import { connect } from 'react-redux';

//Components
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
class Checkout extends Component {


    checkOutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkOutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.props.ings}
                    checkOutCancelled={this.checkOutCancelledHandler}
                    checkOutContinued={this.checkOutContinuedHandler} />
                <Route
                    path={this.props.match.path + '/contact-data'}
                    component={ContactData}
                />
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

export default connect(mapStateToProps)(Checkout);