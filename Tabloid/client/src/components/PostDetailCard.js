import React from "react";
import { Card, CardImg, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
  console.log(post);

  return (
      <Card className="m-4">
          <h1>
            <strong>Title: {post.title}</strong>
          </h1>
          <p>Header image: {post.imageLocation}</p>
          <p>Content: {post.content}</p>
          <p>Publication date: {post.createDateTime}</p>
          <p>Display name: {post.userProfile.displayName}</p>
      </Card>
  );
};

export default Post;