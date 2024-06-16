import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  flights: [],
  airports: []
};

const flightsSlice = createSlice({
  name: "flights",
  initialState,
  reducers: {
    setFlights: (state, action) => {
      state.flights = action.payload;
    },
    setAirports: (state, action) => {
      state.airports = action.payload;
    },
  },
});

export const { setFlights, setAirports } = flightsSlice.actions;

export default flightsSlice.reducer;
