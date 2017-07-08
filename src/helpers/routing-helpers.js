import React from "react";
import {
  Route,
  Redirect,
} from "react-router-dom";

export const AuthenticationRoute = ({ component: Component, ...rest }) => {
  return <Route {...rest} render={props => (
    localStorage.getItem("authToken") ? (
      <Redirect to={{
        pathname: '/',
        state: {from: props.location}
      }}/>
    ) : (
      !rest.shouldRenderComponent ? <Component {...props} /> : null
    )
  )}/>
};

export const HomeRoute = ({ component: Component, ...rest }) => {
  const authTokenInUrl = rest.location.search.split("auth_token=")[1];

  return <Route {...rest} render={function(props) {
    if (authTokenInUrl) {
      localStorage.setItem("authToken", authTokenInUrl);
      rest.initializeActiveUser(authTokenInUrl);
      return <Redirect to={{
        pathname: '/',
        state: { from: props.location }
      }}/>
    } else {
      return <Component {...props} />
    }
  }}/>
};

export const PrivateRoute = ({ component: Component, ...rest }) => {
  return <Route {...rest} render={function(props) {
    if (localStorage.getItem("authToken")) {
      return !rest.shouldRenderComponent ? <Component {...props} /> : null;
    } else {
      return <Redirect to={{
        pathname: '/login',
        state: {from: props.location}
      }}/>
    }
  }}/>
};
