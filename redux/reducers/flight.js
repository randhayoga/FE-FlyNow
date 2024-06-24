import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  flights: [],
  airports: [],
  flight: [],
  returnFlight: [],
  seats: [],
  returnSeats: []
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
    setReturnFlightDetail: (state, action) => {
      state.returnFlight = action.payload;
    },
    setSeatsByFlightId: (state, action) => {
      state.seats = action.payload;
    },
    setSeatsByReturnFlightId: (state, action) => {
      state.returnSeats = action.payload;
    },

  },
});

export const {
  setFlights,
  setAirports,
  setFlightDetail,
  setReturnFlightDetail,
  setSeatsByFlightId,
  setSeatsByReturnFlightId,
} = flightsSlice.actions;

export default flightsSlice.reducer;
