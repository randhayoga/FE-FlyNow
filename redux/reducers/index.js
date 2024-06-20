import { combineReducers } from "@reduxjs/toolkit";
import flights from "./flight";
import histories from "./history";
import auth from "./auth";
import booking from "./booking";

export default combineReducers({
  auth,
  flights,
  histories,
  auth,
  booking,
});
