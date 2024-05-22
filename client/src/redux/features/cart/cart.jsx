import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getCartQuantityById } from "../../../utils";

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
  },
});

export const { ADD_TO_CART, DECREASE_CART } = cart.actions;

export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartTotalQuantity = (state) => state.cart.cartTotalQuantity;
export const selectCartTotalAmount = (state) => state.cart.cartTotalAmount;

export default cart.reducer;
