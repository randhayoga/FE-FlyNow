import axios from "axios";
import { setHistories } from "../reducers/history";

export const searchHistories = () => async (dispatch, getState) => {
  const state = getState();
  const { token } = getState().auth;

  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${import.meta.env.VITE_BACKEND_API}/history`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.request(config);
    const { data } = response.data;

    dispatch(setHistories(data));
  } catch (error) {
    console.log(error);
  }
};

export const searchHistoriesByCity = (city) => async (dispatch, getState) => {
  const state = getState();
  const { token } = getState().auth;

  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${import.meta.env.VITE_BACKEND_API}/history/city/${city}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.request(config);
    const { data } = response.data;

    dispatch(setHistories(data));
  } catch (error) {
    console.log(error);
  }
};

export const searchHistoriesByPaymentStatus =
  (paymentStatus) => async (dispatch, getState) => {
    const state = getState();
    const { token } = getState().auth;

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${
        import.meta.env.VITE_BACKEND_API
      }/history/payment/${paymentStatus}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.request(config);
      const { data } = response.data;

      dispatch(setHistories(data));
    } catch (error) {
      console.log(error);
    }
  };
