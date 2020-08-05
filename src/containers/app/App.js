import React from "react";
import "./App.css";

import Login from "../views/login/Login";
import Home from "../views/home/Home";

import { Switch, Route, Redirect } from "react-router-dom";
import Signup from "../views/signup/Signup";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Home></Home>
        </Route>
        <Route path="/login">
          <Login></Login>
        </Route>
        <Route path="/signup">
          <Signup></Signup>
        </Route>
        <Route path="/logout">
          <Redirect to="/login" />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
