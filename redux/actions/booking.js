import axios from "axios";
import { setBookings } from "../reducers/booking";
import { toast } from "sonner";

export const createBooking =
  (data, setIsSubmitting, setIsSubmitted) => async (dispatch, getState) => {
    const { token } = getState().auth;
    let config = {
      method: "post",
      url: `${import.meta.env.VITE_BACKEND_API}/booking`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };
    try {
      setIsSubmitting(true);
      const response = await axios.request(config);
      const { data } = response.data;
      dispatch(setBookings(data));

      setIsSubmitting(false);
      setIsSubmitted(true);
    } catch (error) {
      setIsSubmitting(false);
      toast.error(error?.response?.data?.message);
    }
  };

export const createPayment =
  (bookingId, paymentAmount) => async (dispatch, getState) => {
    const { token } = getState().auth;
    let config = {
      method: "post",
      url: `${import.meta.env.VITE_BACKEND_API}/payment`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: {
        bookingId: bookingId,
        paymentAmount: paymentAmount,
      },
    };
    try {
      const response = await axios.request(config);
      const { data } = response.data;
      return data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
