import axios from "axios";
import { setToken } from "../reducers/auth";

import defaultImage from "@/assets/images/default-img.jpg";

export const register =
  (navigate, name, email, phoneNumber, password, image) => async (dispatch) => {
    let data = new FormData();
    data.append("name", name);
    data.append("email", email);
    data.append("phoneNumber", phoneNumber.replace("+62 ", "0"));
    data.append("password", password);
    data.append("image", image);

    for (let pair of data.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    let config = {
      method: "post",
      url: "http://localhost:3000/api/auth/register",
      data: data,
    };

    try {
      const response = await axios.request(config);
      const { token } = response.data.data;
      console.log(token);
      dispatch(setToken(token));
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
