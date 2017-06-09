import { createAction } from "redux-actions";

import * as FeedFetcher from "../api-fetchers/feed-fetcher";
import * as VotesFetcher from "../api-fetchers/votes-fetcher";

const appendPosts = createAction("APPEND_POSTS");
const initializePosts = createAction("INITIALIZE_POSTS");
const updatePost = createAction("UPDATE_POST");

export const resetFeed = createAction("RESET_FEED");

export const getPosts = function({page, size = 15, sport, userId} = {}) {
  return async function(dispatch) {
    const queryParams = `${size ? `size=${size}` : ""}${page ? `&page=${page}` : ""}${sport ? `&sport=${sport}` : ""}`;
    if (userId) {
      const response = await FeedFetcher.getUserPosts(userId, queryParams);
      if (page > 0) {
        dispatch(appendPosts(response));
      } else {
        dispatch(initializePosts(response));
      }
    } else {
      const response = await FeedFetcher.getPosts(queryParams);
      if (page > 0) {
        dispatch(appendPosts(response));
      } else {
        dispatch(initializePosts(response));
      }
    }
  };
}

export const votePost = function(postId, currentUserHasVoted) {
  return async function(dispatch) {
    const requestMethod = currentUserHasVoted ? "DELETE" : "POST";
    const response = await VotesFetcher.vote(postId, "Post", requestMethod);
    dispatch(updatePost(response));
  }
}
