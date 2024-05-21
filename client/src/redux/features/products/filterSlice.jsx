import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredProducts: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_BY_SEARCH(state, action) {
      const { products, search } = action.payload;
      const searchProduct = products.filter(
        (product) =>
          product.name?.toLowerCase().includes(search.toLowerCase()) ||
          product.category?.toLowerCase().includes(search.toLowerCase())
      );
      state.filteredProducts = searchProduct;
    },
    SORT_PRODUCT(state, action) {
      const { products, sort } = action.payload;
      let sortProduct = [];
      if (sort === "latest") {
        sortProduct = products; // coming from DB, product has been sort to last created
      }
      if (sort === "lowest-price") {
        sortProduct = products.slice().sort((a, b) => {
          return a.price - b.price;
        });
      }
      if (sort === "highest-price") {
        sortProduct = products.slice().sort((a, b) => {
          return b.price - a.price;
        });
      }
      if (sort === "a-z") {
        sortProduct = products.slice().sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
      }
      if (sort === "z-a") {
        sortProduct = products.slice().sort((a, b) => {
          return b.name.localeCompare(a.name);
        });
      }
      state.filteredProducts = sortProduct;
    },
  },
});

export const { FILTER_BY_SEARCH, SORT_PRODUCT } = filterSlice.actions;
export const selectedFiltered = (state) => state.filter.filteredProducts;

export default filterSlice.reducer;
