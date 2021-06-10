import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";
import * as firebase from "firebase/app";
import "firebase/auth";
import { useHistory } from 'react-router-dom';

export const PostContext = React.createContext();

export const PostProvider = (props) => {
  const [posts, setPosts] = useState([]);
  const [ searchTerms, setSearchTerms ] = useState("");
  const { getToken } = useContext(UserProfileContext);
  const history = useHistory();
  // const getToken = () => firebase.auth().currentUser.getIdToken();

  // const getAllPosts = () => {
  //   return fetch("/api/post/GetWithComments")
  //     .then((res) => res.json())
  //     .then(setPosts);
  // };

  const getAllPosts = () =>
  getToken().then((token) =>  
   fetch("/api/post/", {
     method: "GET",
     headers: {
       Authorization: `Bearer ${token}`
     }
   }).then(res => res.json())
   .then(setPosts));

  const getPostsBySearch = () => {
    return fetch(`/api/post/search?q=${searchTerms}&sortDesc=false`)
      .then((res) => res.json())
      .then(setPosts);
  }

  const getPost = (id) => {
    return getToken().then((token) => 
     fetch(`/api/post/${id}`, {
       method: "GET",
       headers: {
         Authorization: `Bearer ${token}`
       }
     }).then((res) => res.json()))
  }

  const deletePost = postId => {
    return getToken().then((token) =>
     fetch(`/api/post/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }))
  }

  return (
    <PostContext.Provider value={{ posts, getPost, getAllPosts, deletePost }}>
      {props.children}
    </PostContext.Provider>
  );
};
    
   

  

  


