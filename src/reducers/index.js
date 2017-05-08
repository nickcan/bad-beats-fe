import { combineReducers } from "redux";

import activeUser from "./active-user-reducer";
import feed from "./feed-reducer";
import userProfile from "./user-profile-reducer";

export default combineReducers({
  activeUser,
  feed,
  userProfile
});

