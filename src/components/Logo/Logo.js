import React from 'react';

import burgerLogo from '../../assets/images/burger-logo.png';
import './Logo.css';
const logo = (props) => (
    <figure className="Logo">
        <img src={burgerLogo} alt="MyBurger" />
    </figure>
);

export default logo;