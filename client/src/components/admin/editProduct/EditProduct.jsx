import React, { useEffect, useState } from "react";
import "../addProduct/AddProduct.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  RESET_PRODUCT,
  getSingleProduct,
  selectProduct,
  updateProduct,
} from "../../../redux/features/products/ProductSlice";
import {
  getBrands,
  getCategories,
} from "../../../redux/features/cat&brands/CatsAndBrandsSlice";
import { toast } from "react-toastify";
import ProductForm from "../productForm/ProductForm";
import Loader from "../../loader/Loader";

const EditProduct = () => {
  const editProduct = useSelector(selectProduct);
  // const isLoading = useSelector(selectIsLoading);

  const [product, setProduct] = useState(editProduct);
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);

  const { isLoading, msg } = useSelector((state) => state.product);

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // get single product
  useEffect(() => {
    dispatch(getSingleProduct(id));
  }, [dispatch, id]);

  // Diff from product form code
  useEffect(() => {
    setProduct(editProduct);

    setDescription(
      editProduct && editProduct.description ? editProduct.description : ""
    );

    setFiles(editProduct && editProduct.image);
  }, [editProduct]);

  const saveProduct = async (e) => {
    e.preventDefault();
    // Validate image's'
    if (files.length <= 0) {
      return toast.error("Product image is required!");
    }

    const productData = {
      name: product?.name,
      category: product?.category,
      brand: product?.brand,
      quantity: Number(product?.quantity),
      color: product?.color,
      price: product?.price,
      regularPrice: product?.regularPrice,
      description: product?.description,
      image: files,
    };
    await dispatch(updateProduct({ id, productData }));
    // navigate("/admin/all-products");
  };

  // useEffect, to make sure product was created bfor navigating
  useEffect(() => {
    if (msg === "Product updated Successful!") {
      navigate("/admin/all-products");
    }
    dispatch(RESET_PRODUCT());
  }, [msg, navigate, dispatch]);

  return (
    <section>
      {isLoading && <Loader />}
      <div className="container">
        <h3 className="--m3">Edit Product</h3>

        <ProductForm
          saveProduct={saveProduct}
          isEditing={true}
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

export default EditProduct;
