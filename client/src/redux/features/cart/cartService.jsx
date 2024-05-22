import axios from "axios";

const BACKEND_URL = "http://localhost:2000";
const API_URL = `${BACKEND_URL}/auth/users/`;

// Save Users Cart
const saveCartDB = async (cartData) => {
  const resp = await axios.post(API_URL + "saveCart", cartData);
  return resp.data;
};

const getCartDB = async () => {
  const resp = await axios.get(API_URL + "getCartItems");
  return resp.data;
};

const cartService = {
  saveCartDB,
  getCartDB,
};

export default cartService;
