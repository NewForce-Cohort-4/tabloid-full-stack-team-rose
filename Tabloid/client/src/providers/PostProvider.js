import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";
import * as firebase from "firebase/app";
import "firebase/auth";

export const PostContext = React.createContext();

export const PostProvider = (props) => {
  const [posts, setPosts] = useState([]);
  const [ searchTerms, setSearchTerms ] = useState("");
  const { getToken } = useContext(UserProfileContext);
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

  return (
    <PostContext.Provider value={{ posts, getPost, getAllPosts }}>
      {props.children}
    </PostContext.Provider>
  );
};
    
   

  

  


