import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";
import "firebase/auth";

export const CategoryContext = React.createContext();

export const CategoryProvider = (props) => {

    const apiUrl = "/api/quote";
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
        
        const addCategory = (category) => {
          return getToken().then((token) => 
            fetch("/api/category", {
             method: "POST",
             headers: {
               Authorization: `Bearer ${token}`,
               "Content-Type": "application/json",
             },
             body: JSON.stringify(category),
           })
          )};
  
    return (
      <CategoryContext.Provider value={{
           category, getAllCategories, addCategory }}>
        {props.children}
      </CategoryContext.Provider>
    );
}
   
  


 
