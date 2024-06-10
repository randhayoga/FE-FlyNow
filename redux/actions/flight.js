import axios from "axios";
import { setFlights } from "../reducers/flight";

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
