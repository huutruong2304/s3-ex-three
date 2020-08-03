import axios from "axios";
const API_KEY = "AIzaSyBgS6yw5IEtk5eq6rmnkolgQbTYxbpvJv0";

const loginFirebase = async (authData) => {
  const url_login =
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
  const response = await axios.post(url_login + API_KEY, authData);
  console.log(response);
  return response.data;
};

const signUpFirebase = async (authData) => {
  const url_signup =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
  const response = await axios.post(url_signup + API_KEY, authData);
  console.log(response);
  return response.data;
};

export { loginFirebase, signUpFirebase };
