import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const CategoryContext = React.createContext();

export const CategoryProvider = (props) => {
    const { getToken } = useContext(UserProfileContext);
   
    const [category, setCategory] = useState([]);
    //search state
    //const [ searchTerms, setSearchTerms ] = useState("")
  
    const getAllCategories = () =>
       getToken().then((token) =>  
        fetch("/api/category", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then(res => res.json())
        .then(setCategory));  
  
    return (
      <CategoryContext.Provider value={{
           category, getAllCategories }}>
        {props.children}
      </CategoryContext.Provider>
    );
  };