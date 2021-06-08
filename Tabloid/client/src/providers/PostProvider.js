import React, { useState } from "react";
import { Spinner } from "reactstrap";
import firebase from "firebase/app";
import "firebase/auth";

export const PostContext = React.createContext();

export const PostProvider = (props) => {
  const [posts, setPosts] = useState([]);
  const [ searchTerms, setSearchTerms ] = useState("");

  const getAllPosts = () => {
    return fetch("/api/post/GetWithComments")
      .then((res) => res.json())
      .then(setPosts);
  };

  const getPostsBySearch = () => {
    return fetch(`/api/post/search?q=${searchTerms}&sortDesc=false`)
      .then((res) => res.json())
      .then(setPosts);
  }

  const getPost = (id) => {
    return fetch(`/api/post/${id}`).then((res) => res.json());
  };

  return (
    <PostContext.Provider value={{ posts, getAllPosts, searchTerms, setSearchTerms, getPostsBySearch, getPost }}>
      {props.children}
    </PostContext.Provider>
  );
};