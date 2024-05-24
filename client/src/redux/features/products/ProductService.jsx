import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;
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

const deleteProduct = async (id) => {
  const resp = await axios.delete(API_URL + id);
  return resp.data;
};

const getSingleProduct = async (id) => {
  const resp = await axios.get(API_URL + id);
  return resp.data;
};

const updateProduct = async (id, productData) => {
  const resp = await axios.patch(API_URL + id, productData);
  return resp.data;
};

const productService = {
  createProduct,
  getAllProducts,
  deleteProduct,
  getSingleProduct,
  updateProduct,
};

export default productService;
