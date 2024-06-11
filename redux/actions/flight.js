import axios from "axios";
import { setFlights, setAirports } from "../reducers/flight";
import { toast } from "sonner";

export const searchFlight = () => async (dispatch, getState) => {
  const state = getState();

  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${
      import.meta.env.VITE_BACKEND_API
    }flight/search?da=JFK&aa=LAX&dd=2024-06-01&rd=2024-06-02&class=economy&sort=departure-asc`,
  };

  try {
    const response = await axios.request(config);
    const { data } = response.data;

    dispatch(setFlights(data));
  } catch (error) {
    console.log(error);
  }
};

export const getAirports = () => async (dispatch, getState) => {
  const { token } = getState().auth;
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${import.meta.env.VITE_BACKEND_API}/airports`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.request(config);
    const { data } = response.data;
    dispatch(setAirports(data));
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
};
