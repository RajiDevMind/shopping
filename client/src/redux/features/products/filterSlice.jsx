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
    FILTER_BY_CATEGORY(state, action) {
      const { products, category } = action.payload;
      let filterByCat = [];
      if (category === "All") {
        filterByCat = products;
      } else {
        filterByCat = products.filter((product, index) => {
          return product.category === category;
        });
      }
      state.filteredProducts = filterByCat;
    },
    FILTER_BY_BRAND(state, action) {
      const { products, brand } = action.payload;
      let filterByBrand = [];
      if (brand === "All") {
        filterByBrand = products;
      } else {
        filterByBrand = products.filter((product, index) => {
          return product.brand === brand;
        });
      }
      state.filteredProducts = filterByBrand;
    },
    FILTER_BY_PRICE(state, action) {
      const { products, price } = action.payload;
      let filterByPrice = [];
      filterByPrice = products.filter(
        (product, index) =>
          product.price >= price[0] && product.price <= price[1]
      );
      state.filteredProducts = filterByPrice;
    },
  },
});

export const {
  FILTER_BY_SEARCH,
  SORT_PRODUCT,
  FILTER_BY_CATEGORY,
  FILTER_BY_BRAND,
  FILTER_BY_PRICE,
} = filterSlice.actions;

export const selectedFiltered = (state) => state.filter.filteredProducts;

export default filterSlice.reducer;
