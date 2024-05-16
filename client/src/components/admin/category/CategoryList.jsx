import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategory,
  getCategories,
} from "../../../redux/features/cat&brands/CatsAndBrandsSlice";
import { FaTrashAlt } from "react-icons/fa";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const CategoryList = () => {
  const { isLoading, categories } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  // reload for instant display
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  // react-confirm-alert to delete category
  const confirmDelete = (slug) => {
    confirmAlert({
      title: "Delete Category",
      message: "Are you sure to delete this category?",
      buttons: [
        {
          label: "Delete",
          onClick: () => deleteCat(slug),
        },
        {
          label: "Cancel",
          // onClick: () => alert("Click No"),
        },
      ],
    });
  };

  const deleteCat = async (slug) => {
    await dispatch(deleteCategory(slug));
    await dispatch(getCategories());
  };
  return (
    <div className="--mb2">
      <h3>All Categories</h3>

      <div className="table">
        {categories.length < 0 ? (
          <p>No Category found!</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>S/n</th>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => {
                const { _id, name, slug } = category;
                return (
                  <tr key={_id}>
                    <td>{index + 1}</td>
                    <td>{name}</td>
                    <td>
                      <FaTrashAlt
                        size={20}
                        color="red"
                        onClick={() => confirmDelete(slug)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default CategoryList;
