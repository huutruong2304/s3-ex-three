import React, { PureComponent } from "react";
import "./Form.css";
import { loginForm, signUpForm } from "./form-properties";

import Input from "../../components/UI/input/Input";
import Button from "../../components/UI/button/Button";
import Link from "../../components/UI/link/Link";

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
    if (this.props.typeForm === "login") {
      this.setState({
        ...this.state,
        submitMethod: "Log in",
        form: loginForm,
      });
    } else {
      this.setState({
        ...this.state,
        submitMethod: "Signup",
        form: signUpForm,
      });
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
      const rex = /[^a-zA-Z0-9\-\/]/;
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
  // handleClick = (id) => {
  //   const updatedLoginForm = {
  //     ...this.state.loginForm,
  //   };

  //   const updatedElement = {
  //     ...updatedLoginForm[id],
  //   };

  //   updatedElement.touched = true;
  //   updatedLoginForm[id] = updatedElement;
  //   this.setState({ loginForm: updatedLoginForm });
  // };

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
    return (
      <div className="Form">
        {form}
        <p className="Notice-text">
          Not registered? <Link link="#" name="Create an account"></Link>
        </p>
      </div>
    );
  }
}

export default Form;
