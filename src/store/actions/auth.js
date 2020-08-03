import {
  AUTH_FAIL,
  AUTH_SUCCESS,
  AUTH_START,
  AUTH_LOGOUT,
} from "./action-types";
import { loginFirebase, signUpFirebase } from "../../utils/firebase/firebase";
import {
  setTokenOnLocal,
  removeTokenOnLocal,
} from "../../utils/local-storage/local-storage";
const authStart = () => {
  return {
    type: AUTH_START,
  };
};

const authSuccess = (idToken, userId) => {
  return {
    type: AUTH_SUCCESS,
    idToken: idToken,
    userId: userId,
  };
};
const authFail = (error) => {
  return {
    type: AUTH_FAIL,
    error,
  };
};

const authLogout = () => {
  return {
    type: AUTH_LOGOUT,
  };
};

const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(authLogout());
      removeTokenOnLocal();
    }, expirationTime * 1000);
  };
};

const auth = (email, password, isLogin = false) => {
  return async (dispatch) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    if (isLogin) {
      try {
        let { idToken, localId, expiresIn } = await loginFirebase(authData);
        dispatch(authSuccess(idToken, localId));
        setTokenOnLocal(idToken, localId);
        dispatch(checkAuthTimeout(expiresIn));
      } catch (error) {
        dispatch(authFail(error));
      }
    } else {
      try {
        let { idToken, localId, expiresIn } = await signUpFirebase(authData);
        dispatch(authSuccess(idToken, localId));
        setTokenOnLocal(idToken, localId);
        dispatch(checkAuthTimeout(expiresIn));
      } catch (error) {
        dispatch(authFail(error));
      }
    }
  };
};

export { authFail, authSuccess, authStart, auth };
