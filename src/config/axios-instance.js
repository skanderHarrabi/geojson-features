import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'https://www.openstreetmap.org/api/0.6/map?bbox=11.54,48.14,11.543,48.145',
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  }
});


export default axiosInstance;