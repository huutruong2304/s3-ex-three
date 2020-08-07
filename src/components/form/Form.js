import React, { PureComponent } from "react";
import "./Form.css";
import { loginForm, signUpForm, submitForm } from "./form-properties";

import Input from "../UI/input/Input";
import Button from "../UI/button/Button";
import S3Link from "../UI/s3-link/S3Link";

class Form extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      form: {},
      submitMethod: "",
      validForm: false,
    };
  }

  componentDidMount() {
    switch (this.props.typeForm) {
      case "login":
      case "signin":
        this.setState({
          ...this.state,
          submitMethod: "Log in",
          form: loginForm,
        });
        break;
      case "signup":
        this.setState({
          ...this.state,
          submitMethod: "Signup",
          form: signUpForm,
        });
        break;
      default:
        let { form, validForm } = this.initValid(
          submitForm(this.props.placeHolder || {})
        );
        this.setState({
          ...this.sate,
          submitMethod: "Submit",
          validForm,
          form,
        });
        break;
    }
  }

  checkValidity = (value = "", rules) => {
    let errors = [];
    let valid = true;

    if (rules.required && valid) {
      if (value.trim().length === 0) {
        valid = false;
        errors.push("Required");
      }
    }
    if (rules.minLength && valid) {
      if (value.length < rules.minLength) {
        valid = false;

        errors.push("Minimum length is " + rules.minLength);
      }
    }

    if (rules.maxLength && valid) {
      if (value.length > rules.maxLength) {
        valid = false;
        errors.push("Maximum length is " + rules.maxLength);
      }
    }

    if (rules.includeSpecialCharacter && valid) {
      const rex = /[^a-zA-Z0-9]/;
      if (rex.test(value)) {
        valid = false;
        errors.push("Not include special character: @,#,$,%,...");
      }
    }

    if (rules.email && valid) {
      const rex = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/gim;
      if (!rex.test(value)) {
        valid = false;
        errors.push("email is wrong format");
      }
    }

    if (rules.phoneNumber && valid) {
      const rex = /(0[2|3|4|6|8|9])+([0-9]{8})\b/g;
      if (!rex.test(value)) {
        valid = false;
        errors.push("phone number is wrong format");
      }
    }

    return { valid, errors };
  };

  checkPasswordConfirm = (psw, pswCfm) => {
    if (psw !== pswCfm) {
      return false;
    }
    return true;
  };

  initValid = (sampleForm = {}) => {
    let form = sampleForm;
    let validForm = true;
    for (const key in sampleForm) {
      sampleForm[key].valid = this.checkValidity(
        sampleForm[key].value,
        sampleForm[key].validation
      );
      if (!sampleForm[key].valid) {
        validForm = false;
      }
    }
    return { form, validForm };
  };

  handleChange = (event, id) => {
    // console.log("value " + typeof event.target.value);

    const updatedForm = {
      ...this.state.form,
    };

    const updatedElement = {
      ...updatedForm[id],
    };

    updatedElement.value = event.target.value;
    updatedElement.touched = true;
    const { valid, errors } = this.checkValidity(
      updatedElement.value,
      updatedElement.validation
    );
    // if(updatedElement.passwordConfirm && updatedElement.valid){
    //   this.checkPasswordConfirm(updatedForm[password].value,updatedElement.value,);
    // }
    updatedElement.valid = valid;
    updatedElement.errors = errors;

    updatedForm[id] = updatedElement;
    let validForm = true;
    for (const key in updatedForm) {
      if (!updatedForm[key].valid) {
        validForm = false;
        break;
      }
    }
    // console.log(updatedElement);
    // console.log(validForm);
    this.setState({
      form: updatedForm,
      validForm,
    });
  };

  submitForm = (event) => {
    event.preventDefault();
    let formData = {};
    for (const key in this.state.form) {
      formData[key] = this.state.form[key].value;
    }
    this.props.getFormData(formData);
  };

  render() {
    const formElementsArray = [];
    for (const key in this.state.form) {
      formElementsArray.push({
        id: key,
        config: this.state.form[key],
      });
    }

    let form = (
      // <form onSubmit={(event) => this.submitForm(event)}>
      <form>
        {formElementsArray.map((formElement) => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            isValid={formElement.config.valid}
            touched={formElement.config.touched}
            changed={(event) => this.handleChange(event, formElement.id)}
            errors={formElement.config.errors}
            // clicked={() => this.handleClick(formElement.id)}
          />
        ))}
        <Button
          disabled={!this.state.validForm}
          name={this.state.submitMethod}
          clicked={(event) => this.submitForm(event)}
        ></Button>
      </form>
    );
    let noticeText = null;

    if (this.props.typeForm === "login") {
      noticeText = (
        <p className="Notice-text">
          Not registered? <S3Link link="/signup" name="Create an account" />
        </p>
      );
    } else {
      if (this.props.typeForm === "signup") {
        noticeText = (
          <p className="Notice-text">
            <S3Link link="/login" name="Back to Login" />
          </p>
        );
      }
    }

    return (
      <div
        style={{
          display:
            this.props.visable === undefined || this.props.visable
              ? ""
              : "none",
        }}
        className={this.props.size === "full" ? "Form Full-width" : "Form"}
      >
        {form}
        {noticeText}
      </div>
    );
  }
}

export default Form;
