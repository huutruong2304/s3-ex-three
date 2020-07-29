import React, { Component } from "react";
import Input from "../../components/UI/input/Input";
import Button from "../../components/UI/button/Button";

import "./Form.css";
import Link from "../../components/UI/link/Link";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginForm: {
        username: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "Username",
          },
          value: "",
          validation: {
            required: true,
            minLength: 4,
            maxLength: 20,
            // phoneNumber: true,
            // email: true,
            includeSpecialCharacter: true,
          },
          errors: [],

          valid: false,
          touched: false,
        },
        password: {
          elementType: "input",
          elementConfig: {
            type: "password",
            placeholder: "Password",
          },
          value: "",
          validation: {
            required: true,
            minLength: 6,
            maxLength: 30,
          },
          errors: [],
          valid: false,
          touched: false,
        },
      },
      validForm: false,
    };
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
      if (value.length <= rules.minLength) {
        valid = false;

        errors.push("Minimum length is " + rules.minLength);
      }
    }

    if (rules.maxLength && valid) {
      if (value.length >= rules.maxLength) {
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

  handleChange = (event, id) => {
    // console.log("value " + typeof event.target.value);

    const updatedLoginForm = {
      ...this.state.loginForm,
    };

    const updatedElement = {
      ...updatedLoginForm[id],
    };

    updatedElement.value = event.target.value;
    updatedElement.touched = true;
    const { valid, errors } = this.checkValidity(
      updatedElement.value,
      updatedElement.validation
    );

    updatedElement.valid = valid;
    updatedElement.errors = errors;

    let validForm = true;
    for (const key in updatedLoginForm) {
      if (!updatedLoginForm[key].valid) {
        validForm = false;
        break;
      }
    }
    updatedLoginForm[id] = updatedElement;
    this.setState({
      loginForm: updatedLoginForm,
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

  render() {
    const formElementsArray = [];
    for (const key in this.state.loginForm) {
      formElementsArray.push({
        id: key,
        config: this.state.loginForm[key],
      });
    }

    let form = (
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
        <Button disabled={!this.state.validForm} name="login"></Button>
      </form>
    );
    return (
      <div className="Form">
        {form}
        <p className="Text">
          Not registered? <Link link="#" name="Create an account"></Link>
        </p>
      </div>
    );
  }
}

export default Form;
