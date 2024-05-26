import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/auth/order/`;

// Create an order
const createOrder = async (orderData) => {
  const resp = await axios.post(API_URL, orderData);
  return resp.data.msg;
};

// Get All orders
const getAllOrders = async () => {
  const resp = await axios.get(API_URL);
  return resp.data;
};

const orderService = {
  createOrder,
  getAllOrders,
};

export default orderService;
