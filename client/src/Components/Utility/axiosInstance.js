import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://fitness-plus.herokuapp.com/",
});
