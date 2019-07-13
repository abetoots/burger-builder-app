import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Logout/Logout';

import { connect } from 'react-redux';
import * as actions from './store/actions/index';
class App extends Component {
  render() {

    let route = (
      <Switch>
        <Route path="/auth" exact component={Auth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      route = (
        <Switch>
          <Route path="/auth" exact component={Auth} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" exact component={Orders} />
          <Route path="/logout" exact component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <div>
        <Layout>
          {route}
        </Layout>
      </div>
    );
  };
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}
const mapDispatchToProps = dispatch => {
  return {
    initCheckAuthentication: () => dispatch(actions.checkAuthentication())
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
