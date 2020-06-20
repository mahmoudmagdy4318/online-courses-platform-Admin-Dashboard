import axiosInstance from "../API/axiosInstance";

const login = (userData) => {
  return axiosInstance.post("admin/login", userData);
};
const register = (userData) => {
  return axiosInstance.post("admin/", userData);
};
export { login, register };
