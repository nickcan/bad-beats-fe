import { createAction } from "redux-actions";

import * as UserFetcher from "../api-fetchers/user-fetcher";

const initializeUserList = createAction("INITIALIZE_USER_LIST");
const updateUserInList = createAction("UPDATE_USER_IN_LIST");

const appendUserList = createAction("APPEND_USER_LIST");

export const initialize = function(userId, type = "followers", page = 0) {
  return async function(dispatch) {
    const response = await UserFetcher.getUsers(userId, type, page);
    if (page === 0) {
      dispatch(initializeUserList(response));
    } else {
      dispatch(appendUserList(response));
    }
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
