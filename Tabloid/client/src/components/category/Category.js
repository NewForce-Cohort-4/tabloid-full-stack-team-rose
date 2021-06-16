import React from "react";
import { Card, CardImg, CardBody } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import { CategoryContext } from "../../providers/CategoryProvider"

export default function Category(category) {
  const history = useHistory();
  return(
      <Card className="m-4">
        <p className="text-left px-2">{category.category.name}</p>
        <button onClick={() => {
                history.push(`/categories/${category.category.id}`)
              }}>Edit</button>
      </Card>
    );
}