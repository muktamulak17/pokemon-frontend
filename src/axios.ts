import axios from "axios";
import { API_URL } from "./config";

export const register = async (formData: {
  username: string;
  password: string;
}) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, formData, {
      headers: { "Content-Type": "application/json" },
    });
    return { data: response.data, message: "User registered Successfull" };
  } catch (error) {
    return {
      data: null,
      message: axios.isAxiosError(error)
        ? error?.response?.data?.error
        : "Error in registration",
    };
  }
};
