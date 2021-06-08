import React from "react";
import { Card, CardImg, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

const Post = ({ post }) => {


  return (
      <Card className="m-4">
 
       
          <p>
            <strong>{post.title}</strong>
          </p>

 

      </Card>
  );
};

export default Post;