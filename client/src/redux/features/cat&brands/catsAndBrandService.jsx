import axios from "axios";

const BACKEND_URL = "http://localhost:2000";
const API_URL = `${BACKEND_URL}/auth/`;

// Create Category
const createCategory = async (categoryData) => {
  const resp = await axios.post(
    API_URL + "category/createCategory",
    categoryData
  );
  return resp.data;
};

// Get all Category
const getCategories = async () => {
  const resp = await axios.get(API_URL + "category/getCategories");
  return resp.data;
};

// Delete Category by its slug
const deleteCategory = async (slug) => {
  const resp = await axios.delete(API_URL + "category/" + slug);
  return resp.data.msg;
};

// Create Brand
const createBrand = async (brandData) => {
  const resp = await axios.post(API_URL + "brand/createBrand", brandData);
  return resp.data;
};

// Get all Brands
const getBrands = async () => {
  const resp = await axios.get(API_URL + "brand/getBrands");
  return resp.data;
};

// Delete Brand by its slug
const deleteBrand = async (slug) => {
  const resp = await axios.delete(API_URL + "brand/" + slug);
  return resp.data.msg;
};

const categoryAndBrandService = {
  createCategory,
  getCategories,
  deleteCategory,
  createBrand,
  getBrands,
  deleteBrand,
};

export default categoryAndBrandService;
