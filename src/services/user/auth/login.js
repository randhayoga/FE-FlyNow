import { API_ENDPOINT } from "@/utils/api-endpoint";
import http from "@/utils/http";

export const login = async (email, password) => {
  return await http.post(API_ENDPOINT.LOGIN, email, password);
};