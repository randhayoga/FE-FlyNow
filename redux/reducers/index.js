import { combineReducers } from "@reduxjs/toolkit";
import flights from "./flight";
import histories from "./history";
import bookings from "./booking";
import auth from "./auth";
import payment from "./payment";
import notifications from "./notification";

export default combineReducers({
  auth,
  flights,
  histories,
  bookings,
  auth,
  payment,
  notifications,
});
