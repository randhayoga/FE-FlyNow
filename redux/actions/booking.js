import axios from "axios";
import { setBooking } from "../reducers/booking";

export const getPaymentByBookingId =
  (bookingId) => async (dispatch, getState) => {
    const state = getState();
    const { token } = state.auth;

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${import.meta.env.VITE_BACKEND_API}/payment/${bookingId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.request(config);
      const { data } = response.data;
      dispatch(setBooking(data));
    } catch (error) {
      console.log(error);
    }
  };
