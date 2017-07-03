import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import React from "react";

import * as ActiveUserActions from "./actions/active-user-actions";

import AppHeader from "./components/app-header";
import AuthenticationForm from "./containers/authentication-form";
import Home from "./components/home";
import PageNotFound from "./components/page-not-found";
import UserProfile from "./containers/user-profile";

import { AuthenticationRoute, PrivateRoute } from "./helpers/routing-helpers";

class App extends React.Component {
  constructor(props) {
    super(props);
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      props.initializeActiveUser(authToken);
    }
  }

  render() {
    return (
      <div>
        <AppHeader
          activeUser={this.props.activeUser}
          handleLogoutUser={this.props.logoutUser}
        />

        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute path="/sports/:sport" component={Home} />
          <PrivateRoute path="/users/:id" component={UserProfile} />
          <AuthenticationRoute path="/login" component={AuthenticationForm} />
          <AuthenticationRoute path="/signup" component={AuthenticationForm} />
          <Route component={PageNotFound} />
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = function(dispatch, props) {
  return {
    ...bindActionCreators(ActiveUserActions, dispatch),
    logoutUser: function() {
      dispatch(ActiveUserActions.logoutUser());
      localStorage.setItem("authToken", "");
      props.history.push("/login");
    }
  };
};

const mapStateToProps = function(state) {
  return {
    activeUser: state.activeUser
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
