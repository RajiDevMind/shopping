import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import categoryReducer from "./features/cat&brands/CatsAndBrandsSlice";
import productReducer from "./features/products/ProductSlice";
import filterReducer from "./features/products/filterSlice";
import couponReducer from "./features/coupon/couponSlice";
import cartReducer from "./features/cart/cartSlice";
import checkoutReducer from "./features/checkout/checkoutSlice";
import orderReducer from "./features/order/orderSlice";
import transactionReducer from "./features/transaction/transactionSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    product: productReducer,
    filter: filterReducer,
    coupon: couponReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
    order: orderReducer,
    transaction: transactionReducer,
  },
});
