import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import orderService from "./OrderService";
import { toast } from "react-toastify";

const initialState = {
  order: null,
  orders: [],
  totalOrderAmount: 0,
  isError: false,
  isLoading: false,
  isSuccess: false,
  msg: "",
};

export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (orderData, thunkAPI) => {
    try {
      const responseData = await orderService.createOrder(orderData);

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

export const getAllOrders = createAsyncThunk(
  "orders/getAllOrders",
  async (_, thunkAPI) => {
    try {
      const responseData = await orderService.getAllOrders();

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

export const getSingleOrder = createAsyncThunk(
  "orders/getSingleOrder",
  async (id, thunkAPI) => {
    try {
      const responseData = await orderService.getSingleOrder(id);

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

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // create order
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success(action.payload);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.msg = action.payload;
        toast.error(action.payload);
      })
      // Get All Orders
      .addCase(getAllOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.orders = action.payload;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.msg = action.payload;
        toast.error(action.payload);
      })
      // getSingleOrder
      .addCase(getSingleOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.order = action?.payload;
        // console.log(action?.payload);
      })
      .addCase(getSingleOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.msg = action.payload;
        toast.error(action.payload);
      });
  },
});

export const {} = orderSlice.actions;

export const selectOrder = (state) => state.order.orders;
export const selectTotalOrderAmount = (state) => state.order.totalOrderAmount;

export default orderSlice.reducer;
