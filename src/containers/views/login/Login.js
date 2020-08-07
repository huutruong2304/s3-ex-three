import React from "react";
import Form from "../../../components/form/Form";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";

import { Redirect } from "react-router-dom";

const Login = ({ onAuth, isAuthenticated }) => {
  let authRedirect = null;
  const getFormData = (formData) => {
    onAuth(formData.email, formData.password);
  };

  if (isAuthenticated) {
    authRedirect = <Redirect to="/" />;
  }

  return (
    <div className="Wrapper-green-background">
      {authRedirect}
      <Form
        typeForm="login"
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
    onAuth: (email, password) => {
      dispatch(actions.auth(email, password, true));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
