import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";
import firebase from "firebase/app";
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
   fetch("/api/post", {
     method: "GET",
     headers: {
       Authorization: `Bearer ${token}`
     }
   }).then(res => res.json())
   .then(setPosts));

   // This function stores the userProfile object from sessionStorage is stored in a variable
   // and a fetch call is made to the api passing in the current user id
   const getPostsByUserId = () => {
    let entireUserProfile = JSON.parse(sessionStorage.getItem("userProfile"))
    return getToken().then((token) => 
    fetch(`/api/post/currentUser=${entireUserProfile.id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => res.json())
    .then(setPosts));
  }

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

  const updatePost = (postId) => {
    return getToken().then((token) =>
      fetch(`api/post/${postId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(resp => resp.json())
        .then(setPosts))};

  const addPost = (post) => {
   return getToken().then((token) => 
     fetch("/api/post", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    })
   )};

  return (
    <PostContext.Provider value={{ posts, getPost, getAllPosts, deletePost, getPostsBySearch, getPostsByUserId, addPost, updatePost }}>
      {props.children}
    </PostContext.Provider>
  );
};
    
   
