import axios from "axios";
import { setFlights } from "../reducers/flight";

export const searchFlight = (queryParams) => async (dispatch) => {
  // Construct the dynamic API URL
  let apiUrl = `http://localhost:3000/api/flight/search?da=${queryParams.da}&aa=${queryParams.aa}&dd=${queryParams.dd}&class=${queryParams.class}`;

  // Add optional parameters if they exist
  if (queryParams.rd) apiUrl += `&rd=${queryParams.rd}`;
  if (queryParams.sort) apiUrl += `&sort=${queryParams.sort}`;

  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: apiUrl,
  };

  try {
    const response = await axios.request(config);
    const { data } = response.data;

    dispatch(setFlights(data));
  } catch (error) {
    console.log(error);
  }
};
