import React from 'react';
import Aux from '../../hoc/Auxiliary';
import './Layout.scss';
const layout = (props) => (
    <Aux>
        <div className="Content">Toolbar, SideDrawer, Backdrop</div>
        <main>
            {props.children}
        </main>
    </Aux>
);

export default layout;