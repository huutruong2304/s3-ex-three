import React, { useState } from "react";
import Form from "../../form/Form";
import * as actions from "../../../store/actions/index";
import { connect } from "react-redux";

const Signup = ({ signup }) => {
  // const [userData, setUserData] = useState({});
  const getFormData = (formData) => {
    console.log(formData);
    signup(formData.email, formData.password);
  };
  return (
    <div className="Wrapper-green-background">
      <Form
        typeForm="signup"
        getFormData={(formData) => getFormData(formData)}
      ></Form>
    </div>
  );
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    signup: (email, password) => {
      dispatch(actions.auth(email, password));
    },
  };
};

export default connect(null, mapDispatchToProps)(Signup);
