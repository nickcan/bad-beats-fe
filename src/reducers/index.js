import { combineReducers } from "redux";

import activeUser from "./active-user-reducer";
import feed from "./feed-reducer";
import userList from "./user-list-reducer";
import userProfile from "./user-profile-reducer";

export default combineReducers({
  activeUser,
  feed,
  userList,
  userProfile
});

