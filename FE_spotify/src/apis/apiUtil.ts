import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api-gateway",
});
api.interceptors.request.use((config: any) => {
  const token = localStorage.getItem("token");
  // const currentUser = userLocal ? JSON.parse(userLocal) : null;
  config.headers = {
    ...config.headers,
    token,
  };
  return config;
});
export default api;
