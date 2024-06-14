import { combineReducers } from "@reduxjs/toolkit";
import flights from "./flight";
import auth from "./auth";

export default combineReducers({
  auth,
  flights,
});
