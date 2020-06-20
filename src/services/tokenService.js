const jwtDecode = require("jwt-decode");

const getToken = () => {
  const token = localStorage.getItem("Authorization");
  return token;
};
const setToken = (token) => {
  localStorage.setItem("Authorization", token);
};
const removeToken = () => {
  localStorage.removeItem("Authorization");
};
const decodeToken = () => {
  const token = getToken();
  const payload = jwtDecode(token);
  return payload;
};
export { getToken, setToken, removeToken, decodeToken };
