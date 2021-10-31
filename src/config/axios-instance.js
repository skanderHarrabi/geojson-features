import axios from "axios";
const axiosInstance = axios.create({
  baseURL: 'https://www.openstreetmap.org/api/0.6/map',
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  }
});


export default axiosInstance;