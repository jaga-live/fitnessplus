import axios from "axios";
import { getCookie } from "./cookies";

export const axiosInstance = axios.create({
  baseURL: "https://fitness-plus.herokuapp.com/",
  headers: {
    Authorization: `Bearer ${getCookie("token")}`,
  },
});
