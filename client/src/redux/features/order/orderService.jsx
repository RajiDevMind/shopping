import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const API_URL = `${BACKEND_URL}/auth/order/`;

// Create an order
const createOrder = async (orderData) => {
  const resp = await axios.post(API_URL, orderData);
  return resp.data.msg;
};

const orderService = {
  createOrder,
};

export default orderService;
