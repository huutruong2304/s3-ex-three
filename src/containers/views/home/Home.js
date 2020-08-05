import React, { useEffect } from "react";

import "./Home.css";

import Loading from "../loading/Loading";

import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import Admin from "../admin/Admin";

const Home = ({ isLoading, isAuthenticated, onAutoAuth }) => {
  useEffect(() => {
    onAutoAuth();
  }, [onAutoAuth]);

  let mainContainer = <Redirect to="/login"></Redirect>;
  if (isLoading) {
    mainContainer = <Loading></Loading>;
  }
  if (isAuthenticated) {
    mainContainer = <Admin></Admin>;
  }

  return mainContainer;
};

const mapStateToProps = (state, ownProps) => {
  return {
    isAuthenticated: state.auth.token !== null,
    isLoading: state.auth.loading,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onAutoAuth: () => {
      dispatch(actions.autoLogin());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
