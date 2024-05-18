import axios from "axios";

const BACKEND_URL = "http://localhost:2000";
const API_URL = `${BACKEND_URL}/auth/products/`;

// Create Product
const createProduct = async (productData) => {
  const resp = await axios.post(API_URL, productData);
  return resp.data;
};

// Get All Product
const getAllProducts = async () => {
  const resp = await axios.get(API_URL);
  return resp.data;
};

const productService = {
  createProduct,
  getAllProducts,
};

export default productService;
