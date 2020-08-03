import React, { useState } from "react";
import "./App.css";
import { connect } from "react-redux";

import Signup from "../views/signup/Signup";
import Login from "../views/login/Login";
import Home from "../views/home/Home";
function App({ isAuthenticated }) {
  let mainContainer = null;
  if (!isAuthenticated) {
    mainContainer = <Login></Login>;
  } else {
    mainContainer = <Home></Home>;
  }
  return <div className="App">{mainContainer}</div>;
}
const mapStateToProps = (state, ownProps) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch1: () => {
      dispatch();
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
