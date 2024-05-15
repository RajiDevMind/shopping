import React, { useState } from "react";
import Card from "../../card/Card";
import "./Category.scss";

const CreateCategory = () => {
  const [category, setCategory] = useState("");

  const saveCategory = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="--mb2">
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
