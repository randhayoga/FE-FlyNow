import { configureStore } from "@reduxjs/toolkit";
import reducers from "./reducers";

// make global state/temporary DB in frontend
export default configureStore({
  devTools: true, // to enable/disable dev tools in browser
  reducer: reducers, // state datbase
});
