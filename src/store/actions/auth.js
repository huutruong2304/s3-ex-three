import {
  AUTH_FAIL,
  AUTH_SUCCESS,
  AUTH_START,
  AUTH_LOGOUT,
} from "./action-types";
import {
  loginFirebase,
  signUpFirebase,
  getUserFirebase,
} from "../../utils/firebase/firebase";
import {
  setTokenOnLocal,
  removeTokenOnLocal,
  getTokenOnLocal,
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
  removeTokenOnLocal();
  return {
    type: AUTH_LOGOUT,
  };
};

const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      console.log("loggggggggggggout");
      dispatch(authLogout());
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
        setTokenOnLocal(idToken, expiresIn);
        dispatch(checkAuthTimeout(expiresIn));
      } catch (error) {
        dispatch(authFail(error));
      }
    } else {
      try {
        let { idToken, localId, expiresIn } = await signUpFirebase(authData);
        dispatch(authSuccess(idToken, localId));
        setTokenOnLocal(idToken, expiresIn);
        dispatch(checkAuthTimeout(expiresIn));
      } catch (error) {
        dispatch(authFail(error));
      }
    }
  };
};

const autoLogin = () => {
  return async (dispatch) => {
    const { token, expirationDate } = JSON.parse(getTokenOnLocal()) || {};
    if (token) {
      if (new Date(expirationDate) < new Date()) {
        dispatch(authLogout());
      } else {
        dispatch(authStart());

        console.log("auto login");
        const { users } = await getUserFirebase(token);
        dispatch(authSuccess(token, users[0].localId));
        const expirationTime = Math.round(
          (new Date(expirationDate).getTime() - new Date().getTime()) / 1000
        );
        dispatch(checkAuthTimeout(expirationTime));
      }
    }
  };
};

export { authFail, authSuccess, authStart, auth, autoLogin, authLogout };
