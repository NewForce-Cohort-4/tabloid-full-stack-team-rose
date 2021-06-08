import React from "react";
import { Card, CardBody } from "reactstrap";

export default function Post({ post }) {
  return (
    <Card className="m-4">
      <CardBody>
          <strong>{post.text}</strong>
      </CardBody>
    </Card>
  );
}
