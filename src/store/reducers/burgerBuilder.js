import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility/updateObject';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    /**
     * Used in Auth component to redirect directly to checkout if user took these actions:
     * 1)started building burger when not authenticated/logged in,
     * 2)clicked 'sign up to order now'
     * 3)then signed up
     */
    startedBuilding: false
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

const addIngredient = (state, action) => {
    const updatedIngredients = {
        ...state.ingredients,
        [action.ingredientName]: state.ingredients[action.ingredientName] + 1
    };
    return updateObject(state, {
        updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        startedBuilding: true
    });
}

const removeIngredient = (state, action) => {
    const updatedIngredients = {
        ...state.ingredients,
        [action.ingredientName]: state.ingredients[action.ingredientName] - 1
    };
    return updateObject(state, {
        updatedIngredients,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        startedBuilding: true
    });
}

const setIngredients = (state, action) => {
    return updateObject(state, {
        ingredients: action.ingredients,
        totalPrice: 4,
        startedBuilding: false
    });
}

const fetchIngredientsFailed = (state, action) => {
    return updateObject(state, { error: true });
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action);
        default:
            return state;
    }

}

export default reducer;