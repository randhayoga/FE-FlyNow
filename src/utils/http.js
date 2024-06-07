import axios from "axios";
import { CookieStorage, CookiesKeys } from "./cookie";

const http = axios.create({
  baseURL: import.meta.env.VITE_SERVER,
  timeout: 30000,
  headers: {
    Accept: "application/json",
  },
});

http.interceptors.request.use(
  (config) => {
    const token = CookieStorage.get(CookiesKeys.AuthToken) || null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default http;
