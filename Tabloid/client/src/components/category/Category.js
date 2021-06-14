import React from "react";
import { Card, CardImg, CardBody } from "reactstrap";

export default function Category(category) {
    return(
        <Card className="m-4">
      <p className="text-left px-2">{category.category.name}</p>
    </Card>
    );
}