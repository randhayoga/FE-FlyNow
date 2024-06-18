import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  flights: [],
  airports: [],
  flight: [],
  seats: []
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
    setFlightDetail: (state, action) => {
      state.flight = action.payload;
    },
    setSeatsByFlightId: (state, action) => {
      state.seats = action.payload;
    },
  },
});

export const { setFlights, setAirports, setFlightDetail, setSeatsByFlightId } = flightsSlice.actions;

export default flightsSlice.reducer;
