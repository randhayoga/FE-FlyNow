import axios from "axios";
import { toast } from "react-toastify";
import { setToken, setUser } from "../reducers/auth";
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
      url: `${import.meta.env.VITE_BACKEND_API}auth/profile`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
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

export const login = (navigate, email, password) => async (dispatch) => {
  // make loading
  // setIsLoading(true);

  let data = JSON.stringify({
    email,
    password,
  });

  let config = {
    method: "post",
    url: `${import.meta.env.VITE_BACKEND_API}auth/login`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  try {
    const response = await axios.request(config);

    // get and save the token to local storage
    const { data } = response.data;
    const { token, user } = data;

    // Change the token value in the reducer
    dispatch(setToken(token));
    dispatch(setUser(user));

    toast.success("Anda berhasil Login!");

    // redirect to home
    navigate("/"); // it will be not consistent, so alternative we use window until we used the state management
  } catch (error) {
    toast.error("Cek kembali email dan password anda");

    dispatch(logout());
  }

  // setIsLoading(false);
};

export const logout = () => (dispatch) => {
  dispatch(setToken(null));
  dispatch(setUser(null));
};
