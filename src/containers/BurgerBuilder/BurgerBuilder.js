import React, { Component } from 'react';
import axios from '../../axios-orders';

//Higher order components
import Aux from '../../hoc/Auxiliary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
//Redux
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';
//Core
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/BuildControls/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';



class BurgerBuilder extends Component {
    state = {
        ordering: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        // axios.get('https://react-burger-builder-720e2.firebaseio.com/ingredients.json')
        //     .then(response => {
        //         // console.log(response);
        //         this.setState({ ingredients: response.data })
        //     })
        //     .catch(error => {
        //         this.setState({ error: true })
        //     });
    }

    /**
     * Sets purchasable state
     * purchasable is used to enable/disable order now button
     */
    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            //returns the number of each ingredient
            .map(igKey => {
                return ingredients[igKey]
            })
            //return the total of the ingredients
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    }

    orderHandler = () => {
        this.setState({ ordering: true });
    }

    orderCancelHandler = () => {
        this.setState({ ordering: false });
    }

    orderContinueHandler = () => {
        //go to checkout
        this.props.history.push('/checkout');
    }

    render() {
        /**
         * We clone the state.ingredients and set the values to true/false
         * if the initial values are <= 0
         * Used to enable/disable our "less" buttons
         */
        const disabledInfo = {
            ...this.props.ings
        };
        for (let key in disabledInfo) {
            //will evaluate to true/false
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let modalChild = null;
        //Switch from <p> / Spinner / the Burger&Build Controls
        //the <p> is for error handling
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onAddIngredient}
                        ingredientRemoved={this.props.onRemoveIngredient}
                        disabled={disabledInfo}
                        price={this.props.price}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.orderHandler}
                    />
                </Aux>
            );

            //Switch between OrderSummary or Spinner
            modalChild = <OrderSummary
                price={this.props.price}
                ingredients={this.props.ings}
                orderCanceled={this.orderCancelHandler}
                orderContinued={this.orderContinueHandler}
            />;
        }

        if (this.state.loading) {
            modalChild = <Spinner />;
        }


        return (
            <Aux>
                <Modal show={this.state.ordering} modalClosed={this.orderCancelHandler}>
                    {modalChild}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: (ingName) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
        onRemoveIngredient: (ingName) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));