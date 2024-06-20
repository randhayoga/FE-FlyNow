import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  booking: null,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setBooking: (state, action) => {
      state.booking = action.payload;
    },
  },
});

export const { setBooking } = bookingSlice.actions;

export default bookingSlice.reducer;
