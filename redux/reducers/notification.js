import { createSlice } from "@reduxjs/toolkit";

// Define the initial state
const initialState = {
  notifications: [],
  isUnread: false,
};

// Slice
const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotifications: (state, action) => {
      state.notifications = action.payload;
    },
    setIsUnread: (state, action) => {
      state.isUnread = action.payload;
    },
  },
});

export const { setNotifications, setIsUnread } = notificationSlice.actions;
export default notificationSlice.reducer;
