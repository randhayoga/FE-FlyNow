import { API_ENDPOINT } from "@/utils/api-endpoint";
import http from "@/utils/http";

export const verifyOtpService = async (payload) => {
  return await http.put(API_ENDPOINT.VERIFY_OTP, payload);
};

export const resendOtpService = async (payload) => {
  return await http.put(API_ENDPOINT.RESEND_OTP, payload);
};