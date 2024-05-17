import React, { useEffect, useState } from "react";
import "./AddProduct.scss";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../loader/Loader";
import ProductForm from "../productForm/ProductForm";
import {
  getBrands,
  getCategories,
} from "../../../redux/features/cat&brands/CatsAndBrandsSlice";

const initialState = {
  name: "",
  category: "",
  brand: "",
  quantity: "",
  color: "",
  price: "",
  regularPrice: "",
};

const AddProduct = () => {
  const [product, setProduct] = useState(initialState);
  const [description, setDescription] = useState("");
  const [filteredBrands, setFilteredBrands] = useState([]);

  const { name, category, brand, quantity, color, price, regularPrice } =
    product;

  const { isLoading } = useSelector((state) => state.product);
  const { categories, brands } = useSelector((state) => state.category);

  // holding state to avoid empty data
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getBrands());
  }, [dispatch]);

  // filter brands based on selectedCategory
  const filterBrands = (selectedCategory) => {
    const newBrands = brands.filter(
      (brand) => brand.category === selectedCategory
    );
    setFilteredBrands(newBrands);
  };
  useEffect(() => {
    filterBrands(category);
  }, [category]);

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    console.log(product);
    console.log(description);
  };

  return (
    <section>
      {isLoading && <Loader />}
      <div className="container">
        <h3 className="--m3">Add New Product</h3>

        <ProductForm
          saveProduct={saveProduct}
          product={product}
          categories={categories}
          handleInputChange={handleInputChange}
          isEditing={false}
          filteredBrands={filteredBrands}
          description={description}
          setDescription={setDescription}
        />
      </div>
    </section>
  );
};

export default AddProduct;
