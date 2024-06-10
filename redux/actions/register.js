import axios from "axios";
import { setToken } from "../reducers/auth";

import { toast } from "sonner";

export const register =
  (navigate, name, email, phoneNumber, password, image) => async (dispatch) => {
    let data = new FormData();
    data.append("name", name);
    data.append("email", email);
    data.append("phoneNumber", phoneNumber.replace("+62 ", "0"));
    data.append("password", password);
    data.append("image", image);

    dispatch(setToken(null));

    let config = {
      method: "post",
      url: "http://localhost:3000/api/auth/register",
      data: data,
    };

    try {
      const response = await axios.request(config);
      const { token } = response.data.data;
      dispatch(setToken(token));
      navigate("/otp"); // WIP
    } catch (error) {
      if (error.response.data.message === "Email already exists") {
        toast.error("Email telah terdaftar", {
          position: "top-right",
        });
      }
    }
  };
