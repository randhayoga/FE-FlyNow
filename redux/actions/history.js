import axios from "axios";
import { setHistories } from "../reducers/history";

export const searchHistories = () => async (dispatch, getState) => {
  const state = getState();

  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "http://localhost:3000/api/history",
  };

  try {
    const response = await axios.request(config);
    const { data } = response.data;

    dispatch(setHistories(data));
  } catch (error) {
    console.log(error);
  }
};
