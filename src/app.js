import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Route, Switch } from "react-router-dom";
import React from "react";

import * as ActiveUserActions from "./actions/active-user-actions";

import AppHeader from "./components/app-header";
import Home from "./components/home";
import PageNotFound from "./components/page-not-found";

class App extends React.Component {
  componentDidMount() {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      this.props.initializeActiveUser(authToken);
    }
  }

  render() {
    return (
      <div>
        <AppHeader activeUser={this.props.activeUser} />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/sports/:sport" component={Home} />
          <Route component={PageNotFound} />
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    ...bindActionCreators(ActiveUserActions, dispatch)
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
