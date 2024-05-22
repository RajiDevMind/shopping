import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
  fixedCartTotalAmount: 0,
  isError: false,
  isLoading: false,
  isSuccess: false,
  msg: "",
};

const cart = createSlice({
  name: "cartalogue",
  initialState,
  reducers: {
    ADD_TO_CART(state, action) {
      const productIndex = state.cartItems.findIndex(
        (item, index) => item._id === action.payload._id
      );
      if (productIndex >= 0) {
        // Item already exist in the cart,
        // Increase the cart quantity
        state.cartItems[productIndex].cartQuantity += 1;
        toast.success(`${action.payload.name} was increased by one!`, {
          position: "top-left",
        });
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
  },
});

export const { ADD_TO_CART } = cart.actions;

export default cart.reducer;
