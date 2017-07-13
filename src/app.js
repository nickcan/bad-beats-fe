import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  Switch,
  Route
} from "react-router-dom";
import React from "react";
import styled from "styled-components";

import * as ActiveUserActions from "./actions/active-user-actions";
import * as FeedActions from "./actions/feed-actions";
import { togglePostFormView } from "./actions/post-form-actions";

import AppHeader from "./components/app-header";
import AuthenticationForm from "./containers/authentication-form";
import Home from "./components/home";
import Modal from "./components/modal";
import PostForm from "./containers/post-form";
import PageNotFound from "./components/page-not-found";
import UserProfile from "./containers/user-profile";

import { AuthenticationRoute, HomeRoute, PrivateRoute } from "./helpers/routing-helpers";

const AuthModal = ({
  ...props
}) => (
  <Modal {...props} handleClose={() => this.props.history.push("/")}>
    <AuthenticationForm {...props} />
  </Modal>
);

const AppContainer = styled.div`
  * {
    box-sizing: border-box;
    font-family: ${props => props.theme.mainFont};
  }
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      props.initializeActiveUser(authToken);
    }
  }

  render() {
    const { location } = this.props;

    const isLoginModal = !!(
      window.innerWidth > 650 &&
      (location.pathname === "/login" || location.pathname === "/signup")
    );

    return (
      <AppContainer>
        <PostForm />
        <AppHeader {...this.props} />

        <Switch>
          <HomeRoute initializeActiveUser={this.props.initializeActiveUser} getPosts={this.props.getPosts} exact path="/" component={Home} />
          <HomeRoute initializeActiveUser={this.props.initializeActiveUser} getPosts={this.props.getPosts} path="/sports/:sport" component={Home} />
          <PrivateRoute path="/users/:id" component={UserProfile} />
          <AuthenticationRoute path="/login" shouldRenderComponent={isLoginModal} component={AuthenticationForm} />
          <AuthenticationRoute path="/signup" shouldRenderComponent={isLoginModal} component={AuthenticationForm} />
          <Route component={PageNotFound} />
        </Switch>
        {isLoginModal ? <Route render={() => <Home {...this.props} isLoginModal={isLoginModal} />} /> : null}
        {isLoginModal ? <Route path='/login' component={AuthModal} /> : null}
        {isLoginModal ? <Route path='/signup' component={AuthModal} /> : null}
      </AppContainer>
    );
  }
}

const mapDispatchToProps = function(dispatch, props) {
  return {
    ...bindActionCreators(ActiveUserActions, dispatch),
    ...bindActionCreators(FeedActions, dispatch),
    logoutUser: function() {
      dispatch(ActiveUserActions.logoutUser());
      localStorage.setItem("authToken", "");
      if (props.location.pathname === "/") {
        dispatch(FeedActions.getPosts());
      } else {
        props.history.push("/");
      }
    },
    togglePostFormView: function() {
      dispatch(togglePostFormView());
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
