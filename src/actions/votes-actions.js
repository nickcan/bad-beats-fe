import { createAction } from "redux-actions";

import * as VotesFetcher from "../api-fetchers/votes-fetcher";

const togglePostVote = createAction("TOGGLE_POST_VOTE");

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

