import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import transactionService from "./transactionService";
import { toast } from "react-toastify";

const initialState = {
  transaction: null,
  transactions: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  msg: "",
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    RESET_TRANSACTION_MSG(state) {
      state.msg = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Get UserTransactions
      .addCase(getUserTransactions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.transactions = action.payload;
      })
      .addCase(getUserTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.msg = action.payload;
        toast.error(action.payload);
      })
      // verifyAccount
      .addCase(verifyAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyAccount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.msg = action.payload;
        toast.success(action.payload);
      })
      .addCase(verifyAccount.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.msg = action.payload;
        toast.error(action.payload);
      });
  },
});

export const getUserTransactions = createAsyncThunk(
  "transactions/getUserTransactions",
  async (_, thunkAPI) => {
    try {
      const responseData = await transactionService.getUserTransactions();

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

// Verify Recipient account within the application
export const verifyAccount = createAsyncThunk(
  "transactions/verifyAccount",
  async (acctData, thunkAPI) => {
    try {
      const responseData = await transactionService.verifyAccount(acctData);

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

export const { RESET_TRANSACTION_MSG } = transactionSlice.actions;

export const selectTransaction = (state) => state.transaction.transactions;

export default transactionSlice.reducer;
