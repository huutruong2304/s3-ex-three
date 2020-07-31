const loginForm = {
  username: {
    elementType: "input",
    elementConfig: {
      type: "text",
      placeholder: "Username",
    },
    value: "",
    validation: {
      required: false,
      minLength: 4,
      maxLength: 20,
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
};

const signUpForm = {
  // firstName: {
  //   elementType: "input",
  //   elementConfig: {
  //     type: "text",
  //     placeholder: "First name",
  //   },
  //   value: "",
  //   validation: {
  //     required: true,
  //     minLength: 4,
  //     maxLength: 20,
  //   },
  //   errors: [],

  //   valid: false,
  //   touched: false,
  // },
  // lastName: {
  //   elementType: "input",
  //   elementConfig: {
  //     type: "text",
  //     placeholder: "Last name",
  //   },
  //   value: "",
  //   validation: {
  //     required: true,
  //     minLength: 4,
  //     maxLength: 20,
  //   },
  //   errors: [],

  //   valid: false,
  //   touched: false,
  // },
  email: {
    elementType: "input",
    elementConfig: {
      type: "text",
      placeholder: "Email",
    },
    value: "",
    validation: {
      required: true,
      //   minLength: 4,
      //   maxLength: 20,
      // phoneNumber: true,
      email: true,
      //   includeSpecialCharacter: true,
    },
    errors: [],

    valid: false,
    touched: false,
  },
  // username: {
  //   elementType: "input",
  //   elementConfig: {
  //     type: "text",
  //     placeholder: "Username",
  //   },
  //   value: "",
  //   validation: {
  //     required: true,
  //     minLength: 4,
  //     maxLength: 20,
  //     includeSpecialCharacter: true,
  //   },
  //   errors: [],

  //   valid: false,
  //   touched: false,
  // },

  // phoneNumber: {
  //   elementType: "input",
  //   elementConfig: {
  //     type: "text",
  //     placeholder: "Phone number",
  //   },
  //   value: "",
  //   validation: {
  //     required: true,
  //     // minLength: 4,
  //     // maxLength: 20,
  //     phoneNumber: true,
  //     // email: true,
  //     // includeSpecialCharacter: true,
  //   },
  //   errors: [],

  //   valid: false,
  //   touched: false,
  // },

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
  // passwordConfirm: {
  //   elementType: "input",
  //   elementConfig: {
  //     type: "password",
  //     placeholder: "Password confirm",
  //   },
  //   value: "",
  //   validation: {
  //     required: true,
  //     minLength: 6,
  //     maxLength: 30,
  //     passwordConfirm: true,
  //   },
  //   errors: [],
  //   valid: false,
  //   touched: false,
  // },
};

export { loginForm, signUpForm };
