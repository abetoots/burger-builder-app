import React from 'react';
import classes from './Burger.module.scss';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
const burger = (props) => {
    //Basically, maps our object(props.ingredients) into an array of ingredients
    let transformedIngredients =
        /**
         * @returns An array with the keys of the object (keys are ingredients)
         * @param {props.ingredient} Object The ingredients object from state
         */
        Object.keys(props.ingredients)
            .map(igKey => {
                /**
                 * For each key from the returned array above, execute
                 * [...Array(length)] wherein we spread/create Arrays based on the length parameter
                 *  wherein we pass in our ingredient key's value (a number)
                 * @returns Container or empty array/arrays based on the ingredient's value
                 */
                return [...Array(props.ingredients[igKey])]
                    /**
                     * On each returned array above, we return a component
                     */
                    .map((_, i) => {
                        return <BurgerIngredient key={igKey + i} type={igKey} />;
                    });
            })
            //transformedIngredients should now be an array that contains array elements
            // which contains components , like so : [[component/s], [component/s]]
            // We now concat all these arrays into a single array
            .reduce((arr, el) => {
                return arr.concat(el);
            }, []);
    //so we can run this conditional below
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients!</p>;
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}
export default burger;