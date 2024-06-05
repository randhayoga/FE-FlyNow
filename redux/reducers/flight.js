import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const initialState = {
  flights: [],
};

const flightsSlice = createSlice({
  name: "flights",
  initialState,
  reducers: {
    setFlights: (state, action) => {
      state.flights = action.payload;
    },
  },
});

export const { setFlights } = flightsSlice.actions;

export default flightsSlice.reducer;
