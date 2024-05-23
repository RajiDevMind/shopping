import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import couponService from "./couponService";
import { toast } from "react-toastify";

const initialState = {
  coupon: null,
  coupons: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  msg: "",
};

// create coupon
export const createCoupon = createAsyncThunk(
  "coupon/createCoupon",
  async (couponData, thunkAPI) => {
    try {
      const responseData = await couponService.createCoupon(couponData);

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

export const getAllCoupons = createAsyncThunk(
  "coupon/getAllCoupons",
  async (_, thunkAPI) => {
    try {
      const responseData = await couponService.getAllCoupons();

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

export const getSingleCoupon = createAsyncThunk(
  "coupon/getSingleCoupon",
  async (couponName, thunkAPI) => {
    try {
      const responseData = await couponService.getSingleCoupon(couponName);

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

export const deleteCoupon = createAsyncThunk(
  "coupon/deleteCoupon",
  async (id, thunkAPI) => {
    try {
      const responseData = await couponService.deleteCoupon(id);

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

const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
    RESET_COUPON(state) {
      state.coupon = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // create coupon
      .addCase(createCoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Coupon created Successful!");
      })
      .addCase(createCoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.msg = action.payload;
        toast.error(action.payload);
      })
      // Get All coupons
      .addCase(getAllCoupons.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCoupons.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.coupons = action.payload;
        // console.log(action.payload);
      })
      .addCase(getAllCoupons.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.msg = action.payload;
        toast.error(action.payload);
      })
      // Get Single coupon
      .addCase(getSingleCoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.coupon = action.payload;
        toast.success("Coupon applied!");
        // console.log(action.payload);
      })
      .addCase(getSingleCoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.msg = action.payload;
        toast.error(action.payload);
      })
      // Delete coupon
      .addCase(deleteCoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success(action.payload);
      })
      .addCase(deleteCoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.msg = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { RESET_COUPON } = couponSlice.actions;

export default couponSlice.reducer;
