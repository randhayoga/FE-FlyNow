import { API_ENDPOINT } from "@/utils/api-endpoint";
import http from "@/utils/http";

export const resetPasswordService = async (payload) => {
  return await http.put(API_ENDPOINT.RESET_PASSWORD, payload);
};
