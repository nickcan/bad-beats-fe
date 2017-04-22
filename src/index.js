import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import thunkMiddleware from "redux-thunk";

import reducer from "./reducers/index";

import App from "./app";

import appTheme from "./app-theme";

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(
    thunkMiddleware
  )
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <ThemeProvider theme={appTheme}>
        <Route component={App} />
      </ThemeProvider>
    </Router>
  </Provider>,
  document.getElementById("root")
);
