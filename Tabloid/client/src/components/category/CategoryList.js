import React, { useContext, useEffect, useState } from "react";
import { CategoryContext } from "../../providers/CategoryProvider";
import Category from "./Category";
import { useHistory } from "react-router-dom";

const CategoryList = () => {
  const history = useHistory();
  const { category, getAllCategories } = useContext(CategoryContext);

  useEffect(() => {
    getAllCategories();
  }, []);

  // function handleClick() {
  //   history.push("/category/create");
  // }

  return (
    <div className="container">
      {/* <div>
      {/* <button className="btn btn-primary"
        onClick={handleClick}>Create Category</button>
      </div> */}
      <div className="row justify-content-center">
        <div className="cards-column">
          {category.sort((a, b) => a.name.localeCompare(b.name)).map((thisCategory) => (
            <Category key={thisCategory.id} category={thisCategory} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoryList;