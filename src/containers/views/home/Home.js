import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";

import Loading from "../loading/Loading";
import Admin from "../admin/Admin";

const Home = ({ isLoading, isAuthenticated, onAccessed }) => {
  let mainContainer = <Redirect to="/login"></Redirect>;

  useEffect(() => {
    onAccessed();
  }, [onAccessed]);
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

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onAccessed: () => {
      dispatch(actions.accessed());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
