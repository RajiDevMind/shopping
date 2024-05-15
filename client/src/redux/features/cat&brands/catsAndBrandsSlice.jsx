import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import categoryAndBrandService from "./CatsAndBrandService.jsx";
import { toast } from "react-toastify";

const initialState = {
  category: [],
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

export const { RESET_CATS } = CatAndBrandsSlice.actions;

export default CatAndBrandsSlice.reducer;
