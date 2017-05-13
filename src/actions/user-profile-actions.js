import { createAction } from "redux-actions";

import * as UserFetcher from "../api-fetchers/user-fetcher";

const initializeUserProfile = createAction("INITIALIZE_USER_PROFILE");
const updateUserProfile = createAction("UPDATE_USER_PROFILE");

export const resetUserProfile = createAction("RESET_USER_PROFILE");

export const initialize = function(userId) {
  return async function(dispatch) {
    const response = await UserFetcher.getUser(userId);
    dispatch(initializeUserProfile(response));
  };
}

export const followUser = function(userIdToFollow, isFollowing) {
  return async function(dispatch) {
    const request = {
      userId: userIdToFollow
    };

    const requestType = isFollowing ? "DELETE" : "POST";
    const response = await UserFetcher.postFollowing(request, requestType);

    dispatch(updateUserProfile(response));
  };
}
