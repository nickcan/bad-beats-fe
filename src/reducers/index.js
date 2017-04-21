import { combineReducers } from "redux";

import activeUser from "./active-user-reducer";
import feed from "./feed-reducer";

export default combineReducers({
  activeUser,
  feed
});

