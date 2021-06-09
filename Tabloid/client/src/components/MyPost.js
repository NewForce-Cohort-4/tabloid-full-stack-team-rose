import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../providers/PostProvider";
import Post  from  "./Post"


const MyPost = () => {
  const { posts, getPostsByUserId} = useContext(PostContext);

  useEffect(() => {
    getPostsByUserId();
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="cards-column">
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyPost;
