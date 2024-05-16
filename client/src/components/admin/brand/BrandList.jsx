import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBrand,
  getBrands,
} from "../../../redux/features/cat&brands/CatsAndBrandsSlice";
import { FaTrashAlt } from "react-icons/fa";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const BrandList = () => {
  const { isLoading, brands } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  // reload for instant display
  useEffect(() => {
    dispatch(getBrands());
  }, [dispatch]);

  // react-confirm-alert to delete category
  const confirmDelete = (slug) => {
    confirmAlert({
      title: "Delete Brand",
      message: "Are you sure to delete this brand?",
      buttons: [
        {
          label: "Delete",
          onClick: () => delBrand(slug),
        },
        {
          label: "Cancel",
          // onClick: () => alert("Click No"),
        },
      ],
    });
  };

  const delBrand = async (slug) => {
    await dispatch(deleteBrand(slug));
    await dispatch(getBrands());
  };
  return (
    <div className="--mb2">
      <h3>All Brands</h3>

      <div className="table">
        {brands.length < 0 ? (
          <p>No Brand found!</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>S/n</th>
                <th>Name</th>
                <th>Category</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {brands.map((brand, index) => {
                const { _id, name, category, slug } = brand;
                return (
                  <tr key={_id}>
                    <td>{index + 1}</td>
                    <td>{name}</td>
                    <td>{category}</td>
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

export default BrandList;
