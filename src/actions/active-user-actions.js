import { createAction } from "redux-actions";

import * as UserFetcher from "../api-fetchers/user-fetcher";

const initializeActiveUserData = createAction("INITIALIZE_ACTIVE_USER_DATA");

export const authenticateUser = function(userAuthInfo) {
  return async function(dispatch) {
    const response = await UserFetcher.postAuthUser(userAuthInfo);
    localStorage.setItem("authToken", response.authToken);
    dispatch(initializeActiveUserData(response.user));
  };
};

export const initializeActiveUser = function() {
  return async function(dispatch) {
    const response = await UserFetcher.getActiveUser();
    dispatch(initializeActiveUserData(response));
  };
};

