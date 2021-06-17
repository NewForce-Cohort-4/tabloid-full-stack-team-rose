import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";
import "firebase/auth";

export const CategoryContext = React.createContext();

export const CategoryProvider = (props) => {

    const apiUrl = "/api/quote";
    const { getToken } = useContext(UserProfileContext);
    const [category, setCategory] = useState([]);


    const getAllCategories = () =>
        getToken().then((token) =>
            fetch("/api/category", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(res => res.json())
                .then(setCategory));

    const addCategory = (category) =>
        getToken().then((token) =>
            fetch("/api/category/", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(category)
            }));

    const deleteCategory = (categoryId) =>
        getToken().then((token) =>
            fetch(`/api/category/${categoryId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`                
                }}).then(getAllCategories));

    const getCategoryById = (id) => {
      return getToken().then((token) => 
        fetch(`/api/category/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
            }
          }).then((res) => res.json()))
    }

    const updateCategory = (category) => {
      return getToken().then((token) =>
      fetch(`/api/category/${category.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(category)
      }).then((res) => res.json()))
    }
        
          return (
            <CategoryContext.Provider value={{
                 category, getAllCategories, addCategory, updateCategory, getCategoryById, deleteCategory  }}>
              {props.children}
            </CategoryContext.Provider>            

          )}
   
  


 
