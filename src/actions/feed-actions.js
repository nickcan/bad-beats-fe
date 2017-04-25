import { createAction } from "redux-actions";

import * as CommentsFetcher from "../api-fetchers/comments-fetcher";
import * as FeedFetcher from "../api-fetchers/feed-fetcher";
import * as VotesFetcher from "../api-fetchers/votes-fetcher";

const addComment = createAction("ADD_COMMENT");
const initializePosts = createAction("INITIALIZE_POSTS");
const togglePostVote = createAction("TOGGLE_POST_VOTE");
const updatePost = createAction("UPDATE_POST");

export const createComment = function({message, postId} = {}) {
  return async function(dispatch) {
    const response = await CommentsFetcher.postComment(message, postId);
    dispatch(addComment(response));
  };
};

export const getPosts = function({page, size = 15, sport} = {}) {
  return async function(dispatch) {
    const queryParams = `${size ? `size=${size}` : ""}${page ? `&page=${page}` : ""}${sport ? `&sport=${sport}` : ""}`;
    const response = await FeedFetcher.getPosts(queryParams);
    dispatch(initializePosts(response));
  };
};

export const vote = function(id, type, currentUserHasVoted) {
  return async function(dispatch) {
    try {
      dispatch(togglePostVote(id));
      const requestMethod = currentUserHasVoted ? "DELETE" : "POST";
      await VotesFetcher.vote(id, type, requestMethod);
    } catch (e) {
      dispatch(togglePostVote(id));
      console.error(e);
    }
  };
};
