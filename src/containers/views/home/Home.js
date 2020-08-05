import React from "react";

import "./Home.css";

import Loading from "../loading/Loading";

import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
// import * as actions from "../../../store/actions/index";
import Admin from "../admin/Admin";

const Home = ({ isLoading, isAuthenticated, onAutoAuth }) => {
  let mainContainer = <Redirect to="/login"></Redirect>;
  if (isLoading) {
    console.log("loading");
    mainContainer = <Loading></Loading>;
  } else {
    if (isAuthenticated) {
      console.log("admin ");
      mainContainer = <Admin></Admin>;
    }
  }

  return mainContainer;
};

const mapStateToProps = (state, ownProps) => {
  return {
    isAuthenticated: state.auth.token !== null,
    isLoading: state.auth.loading,
  };
};

export default connect(mapStateToProps)(Home);
