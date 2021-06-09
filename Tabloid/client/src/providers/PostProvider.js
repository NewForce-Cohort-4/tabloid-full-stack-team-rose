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

    return (
      <PostContext.Provider value={{
           posts, getAllPosts, getPostsByUserId }}>
        {props.children}
      </PostContext.Provider>
    );
  };
