import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import { CategoryProvider } from "../providers/CategoryProvider"
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";
import PostDetails from"./PostDetails";
import PostList from "./PostList";
import PostForm from "./PostForm";

export default function ApplicationViews() {
  const { isLoggedIn } = useContext(UserProfileContext);

  return (
    <main>
      <Switch>
        <Route path="/" exact>
          {isLoggedIn ? <Hello /> : <Redirect to="/login" />}
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
      
        <Route path="/post">
          <PostList />
        </Route>

        <CategoryProvider>
        <Route path="/posts/add">
        {isLoggedIn ? <PostForm /> : <Redirect to="/login" />}
      </Route>
      </CategoryProvider>

      </Switch>
    </main>
  );
};
