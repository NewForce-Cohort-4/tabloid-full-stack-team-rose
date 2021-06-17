import React, { useContext, useEffect, useState } from "react";
import { CategoryContext } from "../providers/CategoryProvider";
import { Link, useHistory, useParams } from 'react-router-dom';

const CategoryEdit = () => {
  const { category, updateCategory, setCategory, getAllCategories} = useContext(PostContext);
  const [category, setCategory] = useState({});
  const history = useHistory();
  // const [post] = useState({});
  const {id} = useParams();

  useEffect(() => {
    getAllCategories(id).then(setCategory);
  }, []);

  const handleEdit = () => {
    updateCategory(category.id)
      .then(() => {
        history.push("/categories")
      })
  }
};

export default CategoryEdit;