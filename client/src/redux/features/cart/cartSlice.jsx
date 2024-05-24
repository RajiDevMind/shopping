import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getCartQuantityById } from "../../../utils";
import cartService from "./cartService";

// Apply discount to cart
const applyDiscount = (cartTotalAmount, discountPercentage) => {
  let discountAmount = (discountPercentage / 100) * cartTotalAmount;
  let updatedTotal = cartTotalAmount - discountAmount;
  return updatedTotal;
};

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
  initialCartTotalAmount: 0,
  isError: false,
  isLoading: false,
  isSuccess: false,
  msg: "",
};

export const saveCartDB = createAsyncThunk(
  "cart/saveCart",
  async (cartData, thunkAPI) => {
    try {
      const responseData = await cartService.saveCartDB(cartData);

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

export const getCartDB = createAsyncThunk(
  "cart/getCartItems",
  async (_, thunkAPI) => {
    try {
      const responseData = await cartService.getCartDB();

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

const cart = createSlice({
  name: "cartalogue",
  initialState,
  reducers: {
    ADD_TO_CART(state, action) {
      // to get cartQuantity(numbers) in the cart
      const cartQuantity = getCartQuantityById(
        state.cartItems,
        action.payload._id
      );

      const productIndex = state.cartItems.findIndex(
        (item, index) => item._id === action.payload._id
      );
      if (productIndex >= 0) {
        // Item already exist in the cart,
        // Increase the cart quantity

        // compare the amount of product in DB to added cart
        if (cartQuantity === action.payload.quantity) {
          state.cartItems[productIndex].cartQuantity += 0;
          return toast.info("Max quantity of products reached!");
        } else {
          state.cartItems[productIndex].cartQuantity += 1;
          toast.success(`${action.payload.name} was increased by one!`, {
            position: "top-left",
          });
        }
      } else {
        // Item doesn`t exist in the cart
        // Add item to the cart
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProduct);
        toast.success(`${action.payload.name} added to cart!`, {
          position: "top-left",
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems)); // save to localstorage
    },
    DECREASE_CART(state, action) {
      const productIndex = state.cartItems.findIndex(
        (item, index) => item._id === action.payload._id
      );
      if (state.cartItems[productIndex].cartQuantity > 1) {
        // decrease cartQuantity
        state.cartItems[productIndex].cartQuantity -= 1;
        toast.info(`${action.payload.name} was reduced by one!`, {
          position: "top-left",
        });
      } else if (state.cartItems[productIndex].cartQuantity === 1) {
        const newCartItem = state.cartItems.filter(
          (item) => item._id !== action.payload._id
        );
        state.cartItems = newCartItem;
        toast.info(`${action.payload.name} was removed from your cart!`, {
          position: "top-left",
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems)); // save to localstorage
    },
    REMOVE_FROM_CART(state, action) {
      const newCartItem = state.cartItems.filter(
        (item) => item?._id !== action.payload._id
      );
      state.cartItems = newCartItem;
      toast.info(`${action.payload.name} was removed from your cart!`, {
        position: "top-left",
      });
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems)); // save to localstorage
    },
    CLEAR_CART(state, action) {
      state.cartItems = [];
      toast.info(`Cart cleared!`, { position: "top-left" });
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems)); // save to localstorage
    },
    CALCULATE_TOTAL_QUANTITY(state, action) {
      const array = [];
      state.cartItems?.map((item) => {
        const { cartQuantity } = item;
        const quantity = cartQuantity;
        return array.push(quantity);
      });
      const totalQuantity = array.reduce((a, b) => {
        return a + b;
      }, 0);
      state.cartTotalQuantity = totalQuantity;
    },
    CALCULATE_SUBTOTAL(state, action) {
      const array = [];
      state.cartItems?.map((item) => {
        const { price, cartQuantity } = item;
        const cartItemAmount = price * cartQuantity;
        return array.push(cartItemAmount);
      });
      const totalAmount = array.reduce((a, b) => {
        return a + b;
      }, 0);
      // state.cartTotalAmount = totalAmount;
      // Applying discount on coupons
      state.initialCartTotalAmount = totalAmount;

      if (action.payload && action.payload.coupon !== null) {
        const discountPrice = applyDiscount(
          totalAmount,
          action.payload.coupon.discount
        );
        state.cartTotalAmount = discountPrice;
      } else {
        state.cartTotalAmount = totalAmount;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Save cart items
      .addCase(saveCartDB.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(saveCartDB.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
      })
      .addCase(saveCartDB.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.msg = action.payload;
      })
      // Get cart items
      .addCase(getCartDB.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCartDB.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        localStorage.setItem("cartItems", JSON.stringify(action.payload));
        if (action.payload.length > 0) {
          window.location.href = import.meta.env.VITE_CLIENT_URL + "/cart";
        } else {
          window.location.href = import.meta.env.VITE_CLIENT_URL;
        }

        console.log(action.payload);
      })
      .addCase(getCartDB.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.msg = action.payload;
        console.log(action.payload);
      });
  },
});

export const {
  ADD_TO_CART,
  DECREASE_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  CALCULATE_TOTAL_QUANTITY,
  CALCULATE_SUBTOTAL,
} = cart.actions;

export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartTotalQuantity = (state) => state.cart.cartTotalQuantity;
export const selectCartTotalAmount = (state) => state.cart.cartTotalAmount;

export default cart.reducer;
