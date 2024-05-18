import React, { useEffect, useState } from "react";
import "./AddProduct.scss";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../loader/Loader";
import ProductForm from "../productForm/ProductForm";
import {
  getBrands,
  getCategories,
} from "../../../redux/features/cat&brands/CatsAndBrandsSlice";
import { toast } from "react-toastify";
import { createProduct } from "../../../redux/features/products/ProductSlice";
import { useNavigate } from "react-router-dom";

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
  const [files, setFiles] = useState([]);

  const { name, category, brand, quantity, color, price, regularPrice } =
    product;

  const { isLoading } = useSelector((state) => state.product);
  const { categories, brands } = useSelector((state) => state.category);

  const navigate = useNavigate();
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

  const generateSKU = () => {
    const letter = category.slice(0, 3).toUpperCase();
    const number = Date.now();
    const productSKU = letter + "-" + number;
    return productSKU;
  };

  // scrollTo top when certain conditions are not met
  const scrollToPosition = (topsize) => {
    window.scrollTo({
      top: topsize,
      left: 0,
      behavior: "smooth",
    });
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    if (!name || !description) {
      scrollToPosition(300);
      return toast.error(
        "All fields are required including product name and description"
      );
    }
    if (files.length <= 0) {
      scrollToPosition(0);
      return toast.error("Product image is required!");
    }
    const productData = {
      name,
      sku: generateSKU(category),
      category,
      brand,
      quantity: Number(quantity),
      color,
      price,
      regularPrice,
      description,
      image: files,
    };
    await dispatch(createProduct(productData));
    navigate("/admin/all-products");
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
          files={files}
          setFiles={setFiles}
        />
      </div>
    </section>
  );
};

export default AddProduct;
