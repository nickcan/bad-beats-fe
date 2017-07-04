import { createAction } from "redux-actions";

import { authenticate, createUser } from "../api-fetchers/user-fetcher";

export const updateAuthenticationForm = createAction("UPDATE_AUTHENTICATION_FORM");

const addAuthenticationErrors = createAction("ADD_AUTHENTICATION_ERRORS");
const initializeActiveUserData = createAction("INITIALIZE_ACTIVE_USER_DATA");
const resetAuthenticationForm = createAction("RESET_AUTHENTICATION_FORM");

export const login = function() {
  return async function(dispatch, getState) {
    const formData = getState().authenticationForm;

    const request = {
      email: formData.email,
      password: formData.password
    };

    const response = await authenticate(request);

    if (response.errors) {
      dispatch(addAuthenticationErrors(response.errors));
    } else {
      localStorage.setItem("authToken", response.authToken);
      dispatch(initializeActiveUserData(response.user));
      dispatch(resetAuthenticationForm());
    }
  }
}

export const signup = function() {
  return async function(dispatch, getState) {
    const formData = getState().authenticationForm;

    if (formData.password !== formData.passwordConfirmation) {
      dispatch(addAuthenticationErrors({
        password: "password fields don't match"
      }));
      return;
    }

    const request = {
      user: {
        email: formData.email,
        name: formData.name,
        password: formData.password
      }
    };

    const response = await createUser(request);

    if (response.errors) {
      dispatch(addAuthenticationErrors(response.errors));
    } else {
      localStorage.setItem("authToken", response.authToken);
      dispatch(initializeActiveUserData(response.user));
      dispatch(resetAuthenticationForm());
    }
  }
}
