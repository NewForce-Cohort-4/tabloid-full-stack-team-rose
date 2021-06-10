import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";
import * as firebase from "firebase/app";
import "firebase/auth";

export const PostContext = React.createContext();

export const PostProvider = (props) => {
  const [posts, setPosts] = useState([]);
  const [ searchTerms, setSearchTerms ] = useState("");
  const { getToken } = useContext(UserProfileContext);

  const getAllPosts = () =>
  getToken().then((token) =>  
   fetch("/api/post/", {
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
    debugger
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

  return (
    <PostContext.Provider value={{ posts, getPost, getAllPosts, getPostsBySearch, getPostsByUserId }}>
      {props.children}
    </PostContext.Provider>
  );
};
    
   
