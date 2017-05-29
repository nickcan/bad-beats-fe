import { createAction } from "redux-actions";

import * as UserFetcher from "../api-fetchers/user-fetcher";

const initializeUserList = createAction("INITIALIZE_USER_LIST");
const updateUserInList = createAction("UPDATE_USER_IN_LIST");

export const initialize = function(userId, type = "followers") {
  return async function(dispatch) {
    const response = await UserFetcher.getUsers(userId, type);
    dispatch(initializeUserList(response));
  }
}

export const followUserInList = function(userIdToFollow, isFollowing) {
  return async function(dispatch) {
    const request = {
      userId: userIdToFollow
    };

    const requestType = isFollowing ? "DELETE" : "POST";
    const response = await UserFetcher.postFollowing(request, requestType);

    dispatch(updateUserInList(response));
  };
}
