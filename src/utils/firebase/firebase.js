const API_KEY = "AIzaSyBgS6yw5IEtk5eq6rmnkolgQbTYxbpvJv0";

const loginFirebase = async (authData) => {
  try {
    const url_login =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
    const response = await axios.post(url_login + API_KEY, authData);
    console.log(response);
    dispatch(authSuccess(response.data));
  } catch (error) {
    dispatch(authFail(error));
  }
};

const signUpFirebase = async (authData) => {
  try {
    const url_signup =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
    const response = await axios.post(url_signup + API_KEY, authData);
    console.log(response);
    dispatch(authSuccess(response.data));
  } catch (error) {
    dispatch(authFail(error));
  }
};

export { loginFirebase, signUpFirebase };
