import React, { useEffect, useState } from "react";
import Card from "../../card/Card";
import "./Brand.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  createBrand,
  getBrands,
  getCategories,
} from "../../../redux/features/cat&brands/CatsAndBrandsSlice";
import { toast } from "react-toastify";
import Loader from "../../loader/Loader";

const CreateBrand = () => {
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");

  const { isLoading, categories } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  // reload for instant display
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const saveBrand = async (e) => {
    e.preventDefault();
    if (brand.length < 3) {
      return toast.error("Brand name must be above 3 characters!");
    }
    if (!category) {
      return toast.error("Kindly add a parent category");
    }
    const brandData = {
      name: brand,
      category,
    };
    // reload component
    await dispatch(createBrand(brandData));
    await dispatch(getBrands());
    setBrand("");
    setCategory("");
  };

  return (
    <div className="--mb2">
      {isLoading && <Loader />}
      <h3>Create Category</h3>
      <p>
        Use this form to <b>create a brand</b>
      </p>
      <Card cardClass={"card"}>
        <br />
        <form onSubmit={saveBrand}>
          <label htmlFor="brand">brand Name:</label>
          <input
            type="text"
            name="brand"
            placeholder="Brand name"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            required
          />

          <label htmlFor="category">Parent Category</label>
          <select
            name="category"
            className="form-control"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Select category</option>
            {categories.length > 0 &&
              categories.map((cat, index) => (
                <option key={cat._id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
          </select>

          <div className="--my">
            <button type="submit" className="--btn --btn-primary">
              Save Brand
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default CreateBrand;
