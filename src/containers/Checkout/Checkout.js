import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

//hoc
import Aux from '../../hoc/Auxiliary';
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
            const checkOutFinishedRedirect = this.props.checkoutFinished ? <Redirect to="/" /> : null;
            checkoutSummary =
                <div>
                    {checkOutFinishedRedirect}
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
            <Aux>
                {checkoutSummary}
            </Aux>
        );
    }
};

const mapStateToProps = state => {
    return {
        ings: state.burger.ingredients,
        checkoutFinished: state.order.checkoutFinished
    }
}

export default connect(mapStateToProps)(Checkout);