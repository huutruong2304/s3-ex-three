import React, { useState } from "react";
import Form from "../../form/Form";

const Login = () => {
  const [userData, setUserData] = useState({});
  const getFormData = (formData) => {
    console.log(formData);
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

export default Login;
