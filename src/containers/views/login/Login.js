import React, { useState } from "react";
import Form from "../../../components/form/Form";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";

const Login = ({ onAuth }) => {
  const [userData, setUserData] = useState({});
  const getFormData = (formData) => {
    console.log(formData);
    const isLogin = true;
    onAuth(formData.email, formData.password, isLogin);
  };
  return (
    <div className="Wrapper-green-background">
      <Form
        typeForm="login"
        getFormData={(formData) => getFormData(formData)}
      ></Form>
    </div>
  );
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onAuth: (email, password, isLogin) => {
      dispatch(actions.auth(email, password, isLogin));
    },
  };
};
export default connect(null, mapDispatchToProps)(Login);
