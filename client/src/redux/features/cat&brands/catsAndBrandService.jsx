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

const categoryAndBrandService = { createCategory };

export default categoryAndBrandService;
