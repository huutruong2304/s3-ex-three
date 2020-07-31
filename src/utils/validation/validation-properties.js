const required = (value = true) => {
  return { required: value };
};
const minLength = (value = 2) => {
  return { minLength: value };
};
const maxLength = (value = 2) => {
  return { maxLength: value };
};

const isPhoneNumber = (value = false) => {
  return { isPhoneNumber: value };
};

const isEmail = (value = false) => {
  return { isEmail: value };
};

const isIncludeSpecialCharacter = (value = false) => {
  return { isIncludeSpecialCharacter: value };
};

export {
  required,
  minLength,
  maxLength,
  isPhoneNumber,
  isEmail,
  isIncludeSpecialCharacter,
};
