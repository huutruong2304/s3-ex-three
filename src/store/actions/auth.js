import { AUTH_FAIL, AUTH_SUCCESS, AUTH_START } from "./action-types";
import axios from "axios";

const authStart = () => {
  return {
    type: AUTH_START,
  };
};

const authSuccess = (authData) => {
  return {
    type: AUTH_SUCCESS,
    authData,
  };
};
const authFail = (error) => {
  return {
    type: AUTH_FAIL,
    error,
  };
};
const auth = (email, password, isLogin = false) => {
  return async (dispatch) => {
    dispatch(authStart());
    // const authData = {
    //   email: email,
    //   password: password,
    //   returnSecureToken: true,
    // };
    // if (isLogin) {
    // }
    // try {
    //   const response = await axios.post(
    //     "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
    //       API_KEY,

    //     authData
    //   );
    //   console.log(response);
    //   dispatch(authSuccess(response.data));
    // } catch (error) {
    //   dispatch(authFail(error));
    // }
  };
};

export { authFail, authSuccess, authStart, auth };
