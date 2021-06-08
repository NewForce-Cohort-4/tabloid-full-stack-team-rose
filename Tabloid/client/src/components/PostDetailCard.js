import React from "react";
import { Card, CardImg, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
  console.log(post);

  return (
      <Card className="m-4">
          <h1>
            <strong>{post.title}</strong>
          </h1>
          { if (post.imageLocation != null) {
              return post.imageLocation
          } }
          }

      </Card>
  );
};

export default Post;