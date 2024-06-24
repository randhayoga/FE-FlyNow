import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookings: {},
};

const bookingsSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    setBookings: (state, action) => {
      state.bookings = action.payload;
    },
  },
});

export const { setBookings } = bookingsSlice.actions;

export default bookingsSlice.reducer;