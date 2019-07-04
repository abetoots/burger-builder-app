import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavigationItem.scss';
const navigationItem = (props) => (
    <li className="NavigationItems__item">
        <NavLink
            to={props.link}
            className="NavigationItems__link"
            exact={props.exact}>{props.children}</NavLink>
    </li>
);

export default navigationItem;