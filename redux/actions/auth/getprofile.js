import axios from "axios";
import { toast } from "react-toastify";
import { setToken, setUser } from "../../reducers/auth";
import { data } from "autoprefixer";

export const profile =
  (navigate, successRedirect, errorRedirect) => async (dispatch, getState) => {
    const { token } = getState().auth;

    if (!token) {
      // because token is not valid, we will delete it from local storage
      dispatch(logout());

      //  if there are any error redirection we will redirect it
      if (navigate) {
        if (errorRedirect) {
          navigate(errorRedirect);
        }
      }
      return;
    }
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost:3000/api/auth/profile",
      data: data,
    };

    try {
      const response = await axios.request(config);
      const { data } = response.data;

      // set user by response
      dispatch(setUser(data));

      // if there are any success redirection we will redirect it
      if (navigate) {
        if (successRedirect) {
          navigate(successRedirect);
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);

      // because token is not valid, we will delete it from local storage
      dispatch(logout());

      //  if there are any error redirection we will redirect it
      if (navigate) {
        if (errorRedirect) {
          navigate(errorRedirect);
        }
      }
    }
  };

export const logout = () => (dispatch) => {
  dispatch(setToken(null));
  dispatch(setUser(null));
};
