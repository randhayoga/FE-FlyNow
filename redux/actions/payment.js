import axios from "axios";
import { setPayment } from "../reducers/payment";

export const getPaymentByBookingId =
  (bookingId, setIsLoading) => async (dispatch, getState) => {
    const state = getState();
    const { token } = state.auth;
    setIsLoading(true);

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
      dispatch(setPayment(data));
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };
