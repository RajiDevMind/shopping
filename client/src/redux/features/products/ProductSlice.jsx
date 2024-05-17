import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "./ProductService";
import { toast } from "react-toastify";

const initialState = {
  product: null,
  products: [],
  minPrice: null,
  maxPrice: null,
  totalStoreValue: 0,
  outOfStock: 0,
  category: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  msg: "",
};

// create product
export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (productData, thunkAPI) => {
    try {
      const responseData = await productService.createProduct(productData);

      return responseData;
    } catch (error) {
      // the following are d potential err msg from APIs
      const errorMSGs =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(errorMSGs);
    }
  }
);

const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    RESET_PRODUCT(state) {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.msg = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // create product
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.category = action.payload;
        toast.success("Product created Successful!");
        console.log(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.msg = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { RESET_PRODUCT } = ProductSlice.actions;

export default ProductSlice.reducer;
