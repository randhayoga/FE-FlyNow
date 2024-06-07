import { combineReducers } from "@reduxjs/toolkit";
import auth from "./auth";
import flights from "./flight";

export default combineReducers({
  auth,
  flights,
});
