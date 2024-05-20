import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import categoryReducer from "./features/cat&brands/CatsAndBrandsSlice";
import productReducer from "./features/products/ProductSlice";
import couponReducer from "./features/coupon/couponSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    product: productReducer,
    coupon: couponReducer,
  },
});
