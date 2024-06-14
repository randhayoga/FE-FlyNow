import { createSlice } from "@reduxjs/toolkit";

// Define the initial state
const initialState = {
  token: localStorage.getItem("token") || null,
  user: null,
};

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      if (action.payload) {
        localStorage.setItem("token", action.payload);
      } else {
        localStorage.removeItem("token");
      }

      state.token = action.payload;
    },
    setUser: (state, action) => {
      if (action.payload) {
        state.user = action.payload;
      } else {
        state.user = null;
      }
    },
  },
});

export const { setToken, setUser } = authSlice.actions;
export default authSlice.reducer;
