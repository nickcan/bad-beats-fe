import { createAction } from "redux-actions";

import * as FeedFetcher from "../api-fetchers/feed-fetcher";

const initializePosts = createAction("INITIALIZE_POSTS");

export const getPosts = function(size, page) {
  return async function(dispatch) {
    const response = await FeedFetcher.getPosts(size, page);
    dispatch(initializePosts(response));
  };
};
