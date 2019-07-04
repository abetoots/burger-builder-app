import React from 'react';
import './ToggleBurgerMenu.scss';
const toggleBurgerMenu = (props) => {
    const menuClasses = ["ToggleBurgerMenu", props.toggled ? 'ToggleBurgerMenu--toggled' : null]
    return (
        <div className={menuClasses.join(' ')} onClick={props.clicked}>
            <div className="ToggleBurgerMenu__bar ToggleBurgerMenu__bar--1"></div>
            <div className="ToggleBurgerMenu__bar ToggleBurgerMenu__bar--2"></div>
            <div className="ToggleBurgerMenu__bar ToggleBurgerMenu__bar--3"></div>
        </div>
    )
};

export default toggleBurgerMenu;