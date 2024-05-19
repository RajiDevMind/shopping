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
import {
  RESET_PRODUCT,
  createProduct,
} from "../../../redux/features/products/ProductSlice";
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
  const [files, setFiles] = useState([]);

  const { name, category, brand, quantity, color, price, regularPrice } =
    product;

  const { isLoading, msg } = useSelector((state) => state.product);

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    // Validate image's'
    if (files.length <= 0) {
      scrollToPosition(0);
      return toast.error("Product image is required!");
    }

    if (!name) {
      scrollToPosition(300);
      return toast.error("Product name is required!");
    }

    if (category === "Select Category" || brand === "Select brand") {
      scrollToPosition(420);
      return toast.error("Select Category and its Brand?");
    }

    if (!description) {
      scrollToPosition(900);
      return toast.error("Product description is required!");
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
    // navigate("/admin/all-products");
  };
  // useEffect, to make sure product was created bfor navigating
  useEffect(() => {
    if (msg === "Product created Successful!") {
      navigate("/admin/all-products");
    }
    dispatch(RESET_PRODUCT());
  }, [msg, navigate, dispatch]);

  return (
    <section>
      {isLoading && <Loader />}
      <div className="container">
        <h3 className="--m3">Add New Product</h3>

        <ProductForm
          saveProduct={saveProduct}
          isEditing={false}
          product={product}
          setProduct={setProduct}
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
