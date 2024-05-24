import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const API_URL = `${BACKEND_URL}/auth/order/`;

// Save Users Cart
const saveCartDB = async (cartData) => {
  const resp = await axios.post(API_URL + "saveCart", cartData);
  return resp.data;
};
