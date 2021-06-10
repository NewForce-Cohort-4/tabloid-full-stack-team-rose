import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../providers/PostProvider";
import Post  from  "./Post"
import { Link, useHistory, useParams } from 'react-router-dom';

const PostDelete = () => {
  const { posts, deletePost, setPosts, getPost} = useContext(PostContext);
  const [post, setPost] = useState({});
  const history = useHistory();
  // const [post] = useState({});
  const {id} = useParams();

  useEffect(() => {
    getPost(id).then(setPost);
  }, []);

  const handleDelete = () => {
    deletePost(post.id)
      .then(() => {
        history.push("/posts")
      })
  }

  return (
    <div className="container">
      <p>Are you sure you want to delete {post.title}?</p>
      <button onClick={handleDelete}>Confirm Delete</button>
    </div>
  );
};

export default PostDelete;