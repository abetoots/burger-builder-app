import * as actionTypes from './actionTypes';
import axios from 'axios';

export const addIngredient = (ingName) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingName
    }
}

export const removeIngredient = (ingName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingName
    }
}


export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const fetchIngredients = () => {
    return dispatch => {
        axios.get('https://react-burger-builder-720e2.firebaseio.com/ingredients.json')
            .then(response => {
                //dispatch success action
                dispatch(setIngredients(response.data));
            })
            .catch(error => {
                //dispatch error action
                dispatch(fetchIngredientsFailed());
            })
    }
}