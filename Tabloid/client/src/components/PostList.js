import React, { useContext, useEffect } from "react";
import Post from "./Post";
import { PostContext } from "../providers/PostProvider";

export default function PostList() {
  const { posts, refreshPosts } = useContext(PostContext);

  useEffect(() => {
    refreshPosts();
  }, []);

  return (
    <section>
      {posts.map(p =>
        <Post key={p.id} post={p}/>
      )}
    </section>
  );
}