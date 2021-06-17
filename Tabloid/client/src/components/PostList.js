import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../providers/PostProvider";
import Post  from  "./Post"
import { Link } from 'react-router-dom';
//import { useHistory } from 'react-router-dom';

const PostList = () => {
  const { posts, getAllPosts} = useContext(PostContext);

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="cards-column">
          {posts.map((post) => (
            <>
            <Post key={post.id} post={post} />
            <Link to={`/posts/${post.id}`}>Post Details</Link>
            </>
          ))}
          
        </div>
      </div>

    </div>
  );
};

export default PostList;
