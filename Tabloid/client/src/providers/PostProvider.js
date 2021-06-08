import React, { useState, createContext, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const PostContext = createContext();

export function PostProvider(props) {
  const apiUrl = "/api/post";
  const { getToken } = useContext(UserProfileContext);

  const [posts, setPosts] = useState([]);

  const refreshPosts = () =>
    getToken().then((token) =>
      fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(resp => resp.json())
        .then(setPosts));

  const addPost = (Post) =>
    getToken().then((token) =>
      fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(posts)
      }).then(resp => {
        if (resp.ok) {
          return resp.json();
        }
        throw new Error("Unauthorized");
      }));

  return (
    <PostContext.Provider value={{ posts, refreshPosts, addPost }}>
      {props.children}
    </PostContext.Provider>
  );
}