import { API_ENDPOINT } from "@/utils/api-endpoint";
import http from "@/utils/http";

export const forgotPasswordService = async (email) => {
  return await http.put(API_ENDPOINT.FORGOT_PASSWORD, email);
};
