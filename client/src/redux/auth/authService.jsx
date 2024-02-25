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

const authService = {
  register,
};

export default authService;
