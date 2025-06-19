import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://secondtask-1dxz.onrender.com/api",
  withCredentials: true, // ✅ send cookies for protected routes
});

export default axiosInstance;
