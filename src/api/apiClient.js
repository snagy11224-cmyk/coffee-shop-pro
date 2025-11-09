// src/api/apiClient.js
import axios from "axios";
import { v4 as uuid } from "uuid";

const api = axios.create({
  baseURL: "https://dummyjson.com", // هنشتغل على DummyJSON
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  config.headers["X-Request-Id"] = uuid();
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error.response?.status;
    const data = error.response?.data;
    const message =
      data?.message ||
      data?.msg ||
      (status === 404
        ? "Not found"
        : status === 401
        ? "Unauthorized"
        : status === 403
        ? "Forbidden"
        : "Network/Server error");
    return Promise.reject({ status, message, data });
  }
);

export default api;
