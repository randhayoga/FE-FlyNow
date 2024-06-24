import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  payment: null,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setPayment: (state, action) => {
      state.payment = action.payload;
    },
  },
});

export const { setPayment } = paymentSlice.actions;

export default paymentSlice.reducer;
