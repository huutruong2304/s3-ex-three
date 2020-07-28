import React, { Component } from "react";
import Input from "../../components/UI/Input/Input";

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
        <button>Login</button>
      </form>
    );
    return <div>{form}</div>;
  }
}

export default LoginForm;
