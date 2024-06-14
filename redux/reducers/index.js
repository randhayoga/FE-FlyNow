import { combineReducers } from "@reduxjs/toolkit";
import flights from "./flight";
import histories from "./history";

export default combineReducers({
  flights,
  histories,
});
