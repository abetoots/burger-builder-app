import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

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
        let checkoutSummary = <Redirect to="/" />;
        if (this.props.ings) {
            checkoutSummary =
                <div>
                    <CheckoutSummary
                        ingredients={this.props.ings}
                        checkOutCancelled={this.checkOutCancelledHandler}
                        checkOutContinued={this.checkOutContinuedHandler} />
                    <Route
                        path={this.props.match.path + '/contact-data'}
                        component={ContactData}
                    />
                </div>;
        }
        return (
            { checkoutSummary }
        );
    }
};

const mapStateToProps = state => {
    return {
        ings: state.burger.ingredients,
    }
}

export default connect(mapStateToProps)(Checkout);