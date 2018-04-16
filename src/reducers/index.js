import { combineReducers } from "redux";

import activeUser from "./active-user-reducer";
import authenticationForm from "./authentication-form-reducer";
import feed from "./feed-reducer";
import postForm from "./post-form-reducer";
import userList from "./user-list-reducer";
import userProfile from "./user-profile-reducer";

const appReducer = combineReducers({
  activeUser,
  authenticationForm,
  feed,
  postForm,
  userList,
  userProfile
});

export default (state, action) => {
  if (action.type === "LOGOUT_USER") {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
}

