import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const initialState = {
  histories: [],
};

const historiesSlice = createSlice({
  name: "histories",
  initialState,
  reducers: {
    setHistories: (state, action) => {
      state.histories = action.payload;
    },
  },
});

export const { setHistories } = historiesSlice.actions;

export default historiesSlice.reducer;
