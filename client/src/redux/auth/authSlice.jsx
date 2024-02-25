import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService.jsx";
import { toast } from "react-toastify";

const initialState = {
  isLoggedIn: false,
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  msg: "",
};

// Register Users
export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      const responseData = await authService.register(userData);

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

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    RESET_AUTH(state) {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.msg = "";
    },
  },
  extraReducers: (builder) => {
    builder
      //register user
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.user = action.payload;
        toast.success("Registration Successful!");
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.msg = action.payload;
        state.user = null;
        toast.success(action.payload);
      });
  },
});

export const { RESET_AUTH } = authSlice.actions;

export default authSlice.reducer;
