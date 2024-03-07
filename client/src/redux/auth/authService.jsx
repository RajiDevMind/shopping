import axios from "axios";

const BACKEND_URL = "http://localhost:2000";
const API_URL = `${BACKEND_URL}/auth/users/`;

// Register Users
const register = async (userData) => {
  const resp = await axios.post(API_URL + "register", userData, {
    withCredentials: true,
  });
  return resp.data;
};

// Login Users
const login = async (userData) => {
  const resp = await axios.post(API_URL + "login", userData);
  return resp.data;
};

// Logout Users
const logout = async () => {
  const resp = await axios.get(API_URL + "logout");
  return resp.data.msg;
};

// Get Login Status Users
const getLoginStatus = async () => {
  const resp = await axios.get(API_URL + "status");
  return resp.data;
};

const authService = {
  register,
  login,
  logout,
  getLoginStatus,
};

export default authService;
