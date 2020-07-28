import React, { Component } from "react";
import Input from "../../components/UI/input/Input";
import Button from "../../components/UI/button/Button";

import "./LoginForm.css";
import Link from "../../components/UI/link/Link";

class LoginForm extends Component {
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
        },
        password: {
          elementType: "input",
          elementConfig: {
            type: "password",
            placeholder: "Password",
          },
          value: "",
        },
      },
    };
  }

  isChange = (event, id) => {
    const updatedLoginForm = {
      ...this.state.loginForm,
    };

    const updatedElement = {
      ...updatedLoginForm[id],
    };

    updatedElement.value = event?.target.value;
    updatedLoginForm[id] = updatedElement;
    this.setState({
      loginForm: updatedLoginForm,
    });
  };

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
            changed={(event) => this.isChange(event, formElement.id)}
          />
        ))}
        <Button name="login"></Button>
      </form>
    );
    return (
      <div className="LoginForm">
        {form}
        <p class="Text">
          Not registered? <Link link="#" name="Create an account"></Link>
        </p>
      </div>
    );
  }
}

export default LoginForm;
