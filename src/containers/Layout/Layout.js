import React, { Component } from 'react';
//hoc
import Aux from '../../hoc/Auxiliary';
import { connect } from 'react-redux';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import './Layout.scss';
class Layout extends Component {
    state = {
        showSideDrawer: false,
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
                    toggleClicked={this.toggleMenuHandler}
                    isAuthenticated={this.props.isAuthenticated} />
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler}
                    isAuthenticated={this.props.isAuthenticated} />
                <main className="Content">
                    {this.props.children}
                </main>
            </Aux>
        )
    }
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);