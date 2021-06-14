import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";
import PostDetails from"./PostDetails";
import PostList from "./PostList";
import PostDelete from "./PostDelete"
import MyPost from "./MyPost";
import CategoryList from "./Category/CategoryList"

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

        <Route path="/posts/:id">
          {isLoggedIn ? <PostDetails /> : <Redirect to="/login" />}
        </Route>
      
        <Route exact path="/post">
          <PostList />
        </Route>
        
        { /* MyPost component is rendered */ }
        <Route path="/post/currentUser">
          <MyPost />
        </Route>

        <Route path="/delete/:id">
          <PostDelete />
        </Route>

        <Route path="/categories" exact>
          {isLoggedIn ? <CategoryList /> : <Redirect to="/login" />}
        </Route>

      </Switch>
    </main>
  );
};
