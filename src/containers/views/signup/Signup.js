import React from "react";
import Form from "../../../components/form/Form";
import * as actions from "../../../store/actions/index";
import { connect } from "react-redux";

import { Redirect } from "react-router-dom";

const Signup = ({ isAuthenticated, onAuth }) => {
  let authRedirect = null;
  const getFormData = (formData) => {
    console.log(formData);
    onAuth(
      formData.email,
      formData.password,
      formData.username,
      formData.avatar
    );
  };

  if (isAuthenticated) {
    authRedirect = <Redirect to="/" />;
  }

  return (
    <div className="Wrapper-green-background">
      {authRedirect}
      <Form
        typeForm="signup"
        getFormData={(formData) => getFormData(formData)}
      ></Form>
    </div>
  );
};
const mapStateToProps = (state, ownProps) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onAuth: (email, password, username, avatar) => {
      dispatch(actions.auth(email, password, false, username, avatar));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
