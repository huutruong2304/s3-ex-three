import axios from "axios";
const API_KEY = "AIzaSyBgS6yw5IEtk5eq6rmnkolgQbTYxbpvJv0";

const loginFirebase = async (email, password) => {
  const url_login =
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
  const response = await axios.post(url_login + API_KEY, {
    email,
    password,
    returnSecureToken: true,
  });
  console.log(response);
  return response.data;
};

const signUpFirebase = async (email, password) => {
  const url_signup =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
  const response = await axios.post(url_signup + API_KEY, {
    email,
    password,
    returnSecureToken: true,
  });
  console.log(response);
  return response.data;
};

const getUserFirebase = async (idToken) => {
  const url_getUser =
    "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=";
  const response = await axios.post(url_getUser + API_KEY, { idToken });
  return response.data;
};

const updateUser = async (idToken, displayName, photoUrl) => {
  const url_updateUser =
    "https://identitytoolkit.googleapis.com/v1/accounts:update?key=";
  const response = await axios.post(url_updateUser + API_KEY, {
    idToken,
    displayName,
    photoUrl,
    returnSecureToken: true,
  });
  return response.data;
};

export { loginFirebase, signUpFirebase, getUserFirebase, updateUser };
