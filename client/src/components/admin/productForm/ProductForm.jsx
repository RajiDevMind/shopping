import React, { useEffect, useState } from "react";
import "./ProductForm.scss";
import Card from "../../card/Card";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import UploadWidget from "./UploadWidget";
import { BsTrash } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  getBrands,
  getCategories,
} from "../../../redux/features/cat&brands/CatsAndBrandsSlice";

const ProductForm = ({
  saveProduct,
  isEditing,
  product,
  setProduct,
  description,
  setDescription,
  files,
  setFiles,
}) => {
  const [filteredBrands, setFilteredBrands] = useState([]);

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
    filterBrands(product?.category);
  }, [product?.category]);

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const removeImage = (image) => {
    setFiles(files.filter((img) => img !== image));
  };

  return (
    <div className="add-product">
      <UploadWidget files={files} setFiles={setFiles} />

      <Card cardClass={"card"}>
        <br />
        <form onSubmit={saveProduct}>
          <label>Product Images:</label>
          <div className="slide-container">
            <aside>
              {files?.length > 0 &&
                files?.map((img) => (
                  <div key={img} className="thumbnail">
                    <img src={img} alt="Product Image" height={100} />
                    <div>
                      <BsTrash
                        size={25}
                        className="thumbnailIcon"
                        onClick={() => removeImage(img)}
                      />
                    </div>
                  </div>
                ))}
              {files?.length <= 0 && (
                <p className="--m">No image set for this product yet!</p>
              )}
            </aside>
          </div>

          <label htmlFor="name">Product Name:</label>
          <input
            type="text"
            placeholder="Product name"
            name="name"
            value={product?.name}
            onChange={handleInputChange}
          />
          <label>Product Category:</label>
          <select
            name="category"
            value={product?.category}
            onChange={handleInputChange}
          >
            {isEditing ? (
              <option value={product?.category}>{product?.category}</option>
            ) : (
              <option>Select Category</option>
            )}
            {categories.length > 0 &&
              categories.map((category, index) => (
                <option key={category._id} value={category.name}>
                  {category.name}
                </option>
              ))}
          </select>
          {/* Brands start here */}
          <label>Product Brand:</label>
          <select
            name="brand"
            value={product?.brand}
            onChange={handleInputChange}
          >
            {isEditing ? (
              <option value={product?.brand}>{product?.brand}</option>
            ) : (
              <option>Select brand</option>
            )}
            {filteredBrands.length > 0 &&
              filteredBrands.map((brand, index) => (
                <option key={brand._id} value={brand.name}>
                  {brand.name}
                </option>
              ))}
          </select>

          <label htmlFor="name">Product Color:</label>
          <input
            type="text"
            placeholder="Product Color"
            name="color"
            value={product?.color}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="name">Regular Price:</label>
          <input
            type="number"
            placeholder="Regular Price"
            name="regularPrice"
            value={product?.regularPrice}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="name">Product Price:</label>
          <input
            type="number"
            placeholder="Price"
            name="price"
            value={product?.price}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="name">Product Quantity:</label>
          <input
            type="number"
            placeholder="Product Quantity"
            name="quantity"
            value={product?.quantity}
            onChange={handleInputChange}
            required
          />
          <label>Description</label>
          <ReactQuill
            theme="snow"
            value={description}
            onChange={setDescription}
            modules={ProductForm.modules}
            formats={ProductForm.formats}
          />

          <div className="--my">
            <button type="submit" className="--btn --btn-primary">
              Save Product
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

ProductForm.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
};
ProductForm.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "video",
  "image",
  "code-block",
  "align",
];

export default ProductForm;
