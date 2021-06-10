import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const PostContext = React.createContext();

export const PostProvider = (props) => {
    const { getToken } = useContext(UserProfileContext);
   
    const [posts, setPosts] = useState([]);
    //search state
    //const [ searchTerms, setSearchTerms ] = useState("")
  
    const getAllPosts = () =>
       getToken().then((token) =>  
        fetch("/api/post/", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then(res => res.json())
        .then(setPosts));

    const addPost = (post) => {
      getToken().then((token) =>
          fetch("/api/post", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(post),
          }));
        };    
  
    return (
      <PostContext.Provider value={{
           posts, getAllPosts, addPost }}>
        {props.children}
      </PostContext.Provider>
    );
  };