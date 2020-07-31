const url_login =
  "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
const url_singup =
  "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
const API_KEY = "AIzaSyBgS6yw5IEtk5eq6rmnkolgQbTYxbpvJv0";

const loginFirebase = async () => {
  try {
    const response = await axios.post(url_login + API_KEY, authData);
    console.log(response);
    dispatch(authSuccess(response.data));
  } catch (error) {
    dispatch(authFail(error));
  }
};

const signUpFirebase = async () => {
  try {
    const response = await axios.post(url_login + API_KEY, authData);
    console.log(response);
    dispatch(authSuccess(response.data));
  } catch (error) {
    dispatch(authFail(error));
  }
};

export { signUp };
