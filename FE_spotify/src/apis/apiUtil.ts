import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});
api.interceptors.request.use((config: any) => {
  const userLocal = localStorage.getItem("user");
  const currentUser = userLocal ? JSON.parse(userLocal) : null;
  config.headers = {
    ...config.headers,
    token: currentUser ? currentUser.token : "",
    tokencybersoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJOb2RlSlMgNDIiLCJIZXRIYW5TdHJpbmciOiIwNy8xMi8yMDI0IiwiSGV0SGFuVGltZSI6IjE3MzM1Mjk2MDAwMDAiLCJuYmYiOjE3MTUxMDEyMDAsImV4cCI6MTczMzY3NzIwMH0.eRjDGZmIzPZGC0Mf03m9BN2p0gTqsUjw8zEfQtBd_bQ",
  };
  return config;
});
export default api;
