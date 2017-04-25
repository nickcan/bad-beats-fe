import { createAction } from "redux-actions";

import * as CommentsFetcher from "../api-fetchers/comments-fetcher";
import * as VotesFetcher from "../api-fetchers/votes-fetcher";

const addComment = createAction("ADD_COMMENT");
const removeComment = createAction("REMOVE_COMMENT");
const updateComment = createAction("UPDATE_COMMENT");

export const createComment = function({message, postId} = {}) {
  return async function(dispatch) {
    const response = await CommentsFetcher.createComment(message, postId);
    dispatch(addComment(response));
  };
}

export const deleteComment = function(commentId) {
  return async function(dispatch) {
    const response = await CommentsFetcher.deleteComment(commentId);
    dispatch(removeComment(response));
  }
}

export const voteComment = function(commentId, currentUserHasVoted) {
  return async function(dispatch) {
    const requestMethod = currentUserHasVoted ? "DELETE" : "POST";
    const response = await VotesFetcher.vote(commentId, "Comment", requestMethod);
    dispatch(updateComment(response));
  }
}
