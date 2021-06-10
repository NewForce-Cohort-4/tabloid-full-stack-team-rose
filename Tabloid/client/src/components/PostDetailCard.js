import React from "react";
import { Card, CardImg, CardBody } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import { PostProvider } from "../providers/PostProvider";

const Post = ({ post }) => {
  console.log(post);
  const history = useHistory();

  return (
      <Card className="m-4">
          <h1>
            <strong>Title: {post.title}</strong>
          </h1>
          <p>Header image: {post.imageLocation}</p>
          <p>Content: {post.content}</p>
          <p>Publication date: {post.createDateTime}</p>
          <p>Display name: {post.userProfile.displayName}</p>
          <button onClick={() => {
            history.push(`/delete/${post.id}`)
          }}>Delete</button>
      </Card>
  );
};

export default Post;