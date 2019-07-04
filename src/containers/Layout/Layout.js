import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import './Layout.scss';
class Layout extends Component {
    state = {
        showSideDrawer: false
    }
    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false });
    }

    toggleMenuHandler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        });
    }
    render() {
        return (
            <Aux>
                <Toolbar
                    isToggled={this.state.showSideDrawer}
                    toggleClicked={this.toggleMenuHandler} />
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler} />
                <main className="Content">
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default Layout;