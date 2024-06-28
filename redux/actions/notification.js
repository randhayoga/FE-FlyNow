import axios from "axios";
import { setNotifications, setIsUnread } from "../reducers/notification";

export const getNotifications = (filter) => async (dispatch, getState) => {
  const { token } = getState().auth;

  let config = {
    method: "get",
    maxBodyLength: Infinity,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    url: `${import.meta.env.VITE_BACKEND_API}/notification/${filter}`,
  };

  try {
    const response = await axios.request(config);
    const { data } = response.data;

    dispatch(setNotifications(data));
  } catch (error) {
    console.log(error);
  }
};

export const getIsUnread = () => async (dispatch, getState) => {
  const { token } = getState().auth;

  let config = {
    method: "get",
    maxBodyLength: Infinity,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    url: `${import.meta.env.VITE_BACKEND_API}/notification/checkUnread`,
  };

  try {
    const response = await axios.request(config);
    const { data } = response.data;

    dispatch(setIsUnread(data));
  } catch (error) {
    console.log(error);
    dispatch(setIsUnread(false));
  }
};

// DO NOT DELETE THE DISPATCH PARAMETER
export const markAsRead = (id) => async (dispatch, getState) => {
  const { token } = getState().auth;

  let config = {
    method: "patch",
    maxBodyLength: Infinity,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    url: `${import.meta.env.VITE_BACKEND_API}/notification/read/${id}`,
  };

  try {
    await axios.request(config);
  } catch (error) {
    console.log(error);
  }
};

// DO NOT DELETE THE DISPATCH PARAMETER
export const deleteNotification = (id) => async (dispatch, getState) => {
  const { token } = getState().auth;

  let config = {
    method: "delete",
    maxBodyLength: Infinity,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    url: `${import.meta.env.VITE_BACKEND_API}/notification/${id}`,
  };

  try {
    await axios.request(config);
  } catch (error) {
    console.log(error);
  }
};

export const searchNotifications =
  (searchTerm) => async (dispatch, getState) => {
    const { token } = getState().auth;

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      url: `${
        import.meta.env.VITE_BACKEND_API
      }/notification/search?keyword=${searchTerm}`,
    };

    try {
      const response = await axios.request(config);
      const { data } = response.data;

      dispatch(setNotifications(data));
    } catch (error) {
      console.log(error);
    }
  };
