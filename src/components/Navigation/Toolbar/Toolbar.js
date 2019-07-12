import React from 'react';
import './Toolbar.scss';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import ToggleBurgerMenu from '../../UI/ToggleBurgerMenu/ToggleBurgerMenu';
const toolbar = (props) => (
    <header className="Toolbar">
        <ToggleBurgerMenu toggled={props.isToggled} clicked={props.toggleClicked} />
        <div style={{ height: "80%" }}>
            <Logo />
        </div>
        <nav className="Toolbar__nav Toolbar__nav--desktopOnly">
            <NavigationItems isAuthenticated={props.isAuthenticated} />
        </nav>
    </header>
);

export default toolbar;