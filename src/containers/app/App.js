import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

import "./App.css";

import Login from "../views/login/Login";
import Home from "../views/home/Home";
import NotFound from "../views/not-found/NotFound";
import { Switch, Route, Redirect } from "react-router-dom";
import Signup from "../views/signup/Signup";
import { message } from "antd";
// import Admin from "../views/admin/Admin";

function App({ onAutoAuth, isAuthenticated, error }) {
  useEffect(() => {
    onAutoAuth();
  }, [onAutoAuth]);

  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  // const checkAuth = (isAuth) => {
  //   console.log(isAuth);
  //   if (!isAuth) {
  //     return <Redirect to="/login" />;
  //   }
  //   return <Redirect to="/admin"></Redirect>;
  // };

  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Home></Home>
        </Route>
        <Route path="/logout">
          <Redirect to="/login" />
        </Route>
        <Route exact path="/login">
          <Login></Login>
        </Route>
        <Route exact path="/signup">
          <Signup></Signup>
        </Route>
        <Route path="/admin">
          <Home></Home>
        </Route>
        <Route path="*">
          <NotFound></NotFound>
        </Route>
      </Switch>
    </div>
  );
}
const mapStateToProps = (state, ownProps) => {
  return {
    isAuthenticated: state.auth.token !== null,
    error: state.auth.error,
    accessed: state.access.accessed,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onAutoAuth: () => {
      dispatch(actions.autoLogin());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
