import React from "react";
import CreateCategory from "./CreateCategory";
import CategoryList from "./CategoryList";
import { useDispatch } from "react-redux";
import { getCategories } from "../../../redux/features/cat&brands/CatsAndBrandsSlice";

const Category = () => {
  const dispatch = useDispatch();
  // to relaod and instantly display categories list component whenever create a category
  const reloadCategory = () => {
    dispatch(getCategories());
  };

  return (
    <section>
      <div className="container coupon">
        <CreateCategory reloadCategory={reloadCategory} />
        <CategoryList />
      </div>
    </section>
  );
};

export default Category;
