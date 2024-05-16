import React, { useState } from "react";
import Card from "../../card/Card";
import "./Category.scss";
import { useDispatch, useSelector } from "react-redux";
import { createCategory } from "../../../redux/features/cat&brands/CatsAndBrandsSlice";
import { toast } from "react-toastify";
import Loader from "../../loader/Loader";

const CreateCategory = () => {
  const [category, setCategory] = useState("");

  const { isLoading } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  const saveCategory = async (e) => {
    e.preventDefault();
    if (category.length < 3) {
      return toast.error("Category name must be above 3 characters!");
    }
    const categoryData = {
      name: category,
    };
    dispatch(createCategory(categoryData));
    setCategory("");
  };

  return (
    <div className="--mb2">
      {isLoading && <Loader />}
      <h3>Create Category</h3>
      <p>
        Use this form to <b>create a category</b>
      </p>
      <Card cardClass={"card"}>
        <br />
        <form onSubmit={saveCategory}>
          <label htmlFor="category">Category Name:</label>
          <input
            type="text"
            name="category"
            placeholder="Category name"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
          <div className="--my">
            <button type="submit" className="--btn --btn-primary">
              Save Category
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default CreateCategory;
