import axios from "axios";
import { getCookie } from "./cookies";

export const axiosInstance = axios.create({
  baseURL: "https://fitness-plus.herokuapp.com/",
  // baseURL: "https://localhost:5000",
  // baseURL:
  //   "https://cors-anywhere.herokuapp.com/https://fitness-plus.herokuapp.com/",
  headers: {
    Authorization: `Bearer ${getCookie("token")}`,
  },
});

axiosInstance.interceptors.request.use(
  function (config) {
    const token = getCookie("token");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
