import React from "react";
import "./ProductForm.scss";
import Card from "../../card/Card";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import UploadWidget from "./UploadWidget";

const ProductForm = ({
  saveProduct,
  product,
  handleInputChange,
  categories,
  isEditing,
  filteredBrands,
  description,
  setDescription,
  files,
  setFiles,
}) => {
  return (
    <div className="add-product">
      <UploadWidget files={files} setFiles={setFiles} />

      <Card cardClass={"card"}>
        <br />
        <form onSubmit={saveProduct}>
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
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
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
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "color",
];

export default ProductForm;
