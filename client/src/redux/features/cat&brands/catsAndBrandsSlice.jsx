import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import categoryAndBrandService from "./CatsAndBrandService.jsx";
import { toast } from "react-toastify";

const initialState = {
  categories: [],
  brands: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  msg: "",
};

const CatAndBrandsSlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    RESET_CATS(state) {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.msg = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // create category
      .addCase(createCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Category created Successful!");
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.msg = action.payload;
        toast.error(action.payload);
      })
      // Get all categories
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.categories = action.payload;
        toast.success(action.payload);
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.msg = action.payload;
        toast.error(action.payload);
      })
      // Delete category
      .addCase(deleteCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success(action.payload);
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.msg = action.payload;
        toast.success(action.payload);
      })
      // create Brand
      .addCase(createBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Brand created Successful!");
      })
      .addCase(createBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.msg = action.payload;
        toast.error(action.payload);
      })
      // Get all Brands
      .addCase(getBrands.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBrands.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.brands = action.payload;
        toast.success(action.payload);
        // console.log(action.payload);
      })
      .addCase(getBrands.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.msg = action.payload;
        toast.error(action.payload);
      })
      // Delete Brand
      .addCase(deleteBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success(action.payload);
      })
      .addCase(deleteBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.msg = action.payload;
        toast.success(action.payload);
      });
  },
});

// create category
export const createCategory = createAsyncThunk(
  "category/createCategory",
  async (categoryData, thunkAPI) => {
    try {
      const responseData = await categoryAndBrandService.createCategory(
        categoryData
      );

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

// Get all categories
export const getCategories = createAsyncThunk(
  "category/getCategories",
  async (_, thunkAPI) => {
    try {
      const responseData = await categoryAndBrandService.getCategories();

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

// Delete category
export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (slug, thunkAPI) => {
    try {
      const responseData = await categoryAndBrandService.deleteCategory(slug);

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

// create Brand
export const createBrand = createAsyncThunk(
  "brand/createBrand",
  async (brandData, thunkAPI) => {
    try {
      const responseData = await categoryAndBrandService.createBrand(brandData);

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

// Get all Brands
export const getBrands = createAsyncThunk(
  "brand/getBrands",
  async (_, thunkAPI) => {
    try {
      const responseData = await categoryAndBrandService.getBrands();

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

// Delete brand
export const deleteBrand = createAsyncThunk(
  "brand/deleteBrand",
  async (slug, thunkAPI) => {
    try {
      const responseData = await categoryAndBrandService.deleteBrand(slug);

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

export const { RESET_CATS } = CatAndBrandsSlice.actions;

export default CatAndBrandsSlice.reducer;
