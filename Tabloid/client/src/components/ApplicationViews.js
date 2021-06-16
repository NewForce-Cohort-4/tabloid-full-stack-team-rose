import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import { CategoryProvider } from "../providers/CategoryProvider";
import { PostProvider } from "../providers/PostProvider";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";
import PostDetails from"./PostDetails";
import PostList from "./PostList";
import PostDelete from "./PostDelete"
import MyPost from "./MyPost";
import CategoryList from "./category/CategoryList"
import PostForm from "./PostForm";
import CategoryForm from "./category/CategoryForm"

export default function ApplicationViews() {
  const { isLoggedIn } = useContext(UserProfileContext);

  return (
    <main>
      <Switch>
        <Route path="/" exact>
          {isLoggedIn ? <Hello /> : <Redirect to="/login" />}
        </Route>

        <Route path="/" exact>
          {isLoggedIn ? <PostList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/register">
          <Register />
        </Route>

        <Route exact path="/posts/:id(\d+)">
          {isLoggedIn ? <PostDetails /> : <Redirect to="/login" />}
        </Route>
      
      <PostProvider>
        <Route path="/post">
          <PostList />
        </Route>
        
        { /* MyPost component is rendered */ }
        <Route path="/post/currentUser">
          <MyPost />
        </Route>

        <Route path="/delete/:id">
          <PostDelete />
        </Route>
        <CategoryProvider>
          <Route path="/categories" exact>
            {isLoggedIn ? <CategoryList /> : <Redirect to="/login" />}
          </Route>
        
          <Route exact path="/categories/:categoryid(\d+)" exact>
            {isLoggedIn ? <CategoryForm /> : <Redirect to="/login" />}
          </Route>
        
          <Route path="/posts/add">
            {isLoggedIn ? <PostForm /> : <Redirect to="/login" />}
          </Route>

          <Route path="/category/add">
            {isLoggedIn ? <CategoryForm /> : <Redirect to="/login" />}
          </Route>
        </CategoryProvider>

      </PostProvider>


      </Switch>
    </main>
  );
};
