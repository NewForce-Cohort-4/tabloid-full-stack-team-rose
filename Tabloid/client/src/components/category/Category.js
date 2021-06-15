

import React, { useContext, useState } from "react";
import { Card, CardImg, CardBody } from "reactstrap";
import { CategoryContext } from "../../providers/CategoryProvider"
import { useHistory } from "react-router-dom";

export default function Category(category) {
  const history = useHistory();
  const { deleteCategory } = useContext(CategoryContext)


  const handleDelete = () => {
      const r = window.confirm(`Are you sure you want to delete "${category.category.name}"?`)
      if (r === true) {
        deleteCategory(category.category.id)
          .then(() => {
            history.push("/categories")
          })
      }
      else
      {
        history.push("/categories")
      }
      
    }
    return (
      category.category.post.length !== 0 ?
      <Card className="m-4">
        <p className="text-left px-2">{category.category.name}</p>
      </Card> 
      :   
      <Card className="m-4">
        <p className="text-left px-2">{category.category.name}</p>
        <button onClick={handleDelete}>Delete</button>
      </Card>
    );

}