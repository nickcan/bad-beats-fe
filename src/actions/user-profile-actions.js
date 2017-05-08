import { createAction } from "redux-actions";

import * as UserFetcher from "../api-fetchers/user-fetcher";

const initializeUserProfile = createAction("INITIALIZE_USER_PROFILE");

export const initialize = function(userId) {
  return async function(dispatch) {
    const user = await UserFetcher.getUser(userId);
    dispatch(initializeUserProfile(user));
  }
}
