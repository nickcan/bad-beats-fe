import { createAction } from "redux-actions";

import * as CommentsFetcher from "../api-fetchers/comments-fetcher";

const addComment = createAction("ADD_COMMENT");

export const createComment = function({message, postId} = {}) {
  return async function(dispatch) {
    const response = await CommentsFetcher.postComment(message, postId);
    dispatch(addComment(response));
  };
};
