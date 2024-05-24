import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;
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

// Get Users
const getUser = async () => {
  const resp = await axios.get(API_URL + "get-user");
  return resp.data;
};

// Update User Profile
const updateUser = async (userData) => {
  const resp = await axios.patch(API_URL + "update-user", userData);
  return resp.data;
};
// Update User Profile
const updateImg = async (userData) => {
  const resp = await axios.patch(API_URL + "add-image", userData);
  return resp.data;
};

const authService = {
  register,
  login,
  logout,
  getLoginStatus,
  getUser,
  updateUser,
  updateImg,
};

export default authService;
