import React from "react";
import Form from "../../../components/form/Form";
import * as actions from "../../../store/actions/index";
import { connect } from "react-redux";

const Signup = ({ onAuth }) => {
  // const [userData, setUserData] = useState({});
  const getFormData = (formData) => {
    console.log(formData);
    onAuth(formData.email, formData.password);
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
    onAuth: (email, password) => {
      dispatch(actions.auth(email, password));
    },
  };
};

export default connect(null, mapDispatchToProps)(Signup);
