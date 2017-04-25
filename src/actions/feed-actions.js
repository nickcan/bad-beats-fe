import { createAction } from "redux-actions";

import * as FeedFetcher from "../api-fetchers/feed-fetcher";

const initializePosts = createAction("INITIALIZE_POSTS");
const updatePost = createAction("UPDATE_POST");

export const getPosts = function({page, size = 15, sport} = {}) {
  return async function(dispatch) {
    const queryParams = `${size ? `size=${size}` : ""}${page ? `&page=${page}` : ""}${sport ? `&sport=${sport}` : ""}`;
    const response = await FeedFetcher.getPosts(queryParams);
    dispatch(initializePosts(response));
  };
};
