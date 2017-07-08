import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  Switch,
  Route
} from "react-router-dom";
import React from "react";

import * as ActiveUserActions from "./actions/active-user-actions";
import * as FeedActions from "./actions/feed-actions";

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
  <Modal {...props}>
    <AuthenticationForm {...props} />
  </Modal>
);

const PostsModal = ({
  ...props
}) => (
  <Modal {...props}>
    <PostForm {...props} />
  </Modal>
);

class App extends React.Component {
  constructor(props) {
    super(props);
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      props.initializeActiveUser(authToken);
    }
  }

  render() {
    const { location } = this.props

    const isLoginModal = !!(
      window.innerWidth > 650 &&
      (location.pathname === "/login" || location.pathname === "/signup")
    );

    const isPostsModal = !!(
      window.innerWidth > 650 &&
      location.pathname === "/posts/new"
    );

    return (
      <div>
        <AppHeader
          activeUser={this.props.activeUser}
          location={location}
          handleLogoutUser={this.props.logoutUser}
        />

        <Switch>
          <HomeRoute initializeActiveUser={this.props.initializeActiveUser} getPosts={this.props.getPosts} exact path="/" component={Home} />
          <HomeRoute initializeActiveUser={this.props.initializeActiveUser} getPosts={this.props.getPosts} path="/sports/:sport" component={Home} />
          <PrivateRoute path="/users/:id" component={UserProfile} />
          <PrivateRoute path="/posts/new" shouldRenderComponent={isPostsModal} component={PostForm} />
          <AuthenticationRoute path="/login" shouldRenderComponent={isLoginModal} component={AuthenticationForm} />
          <AuthenticationRoute path="/signup" shouldRenderComponent={isLoginModal} component={AuthenticationForm} />
          <Route component={PageNotFound} />
        </Switch>
        {isLoginModal || isPostsModal ? <Route render={() => <Home {...this.props} isLoginModal={isLoginModal} />} /> : null}

        {isLoginModal ? <Route path='/login' component={AuthModal} /> : null}
        {isLoginModal ? <Route path='/signup' component={AuthModal} /> : null}

        {isPostsModal ? <Route path='/posts/new' component={PostsModal} /> : null}
      </div>
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
