import {
  AUTH_FAIL,
  AUTH_SUCCESS,
  AUTH_START,
  AUTH_LOGOUT,
  AUTH_UPDATE,
} from "./action-types";
import {
  loginFirebase,
  signUpFirebase,
  getUserFirebase,
  updateUser,
} from "../../utils/firebase/firebase";
import {
  setTokenOnLocal,
  removeTokenOnLocal,
  getTokenOnLocal,
} from "../../utils/local-storage/local-storage";
const authStart = () => {
  console.log("auth start");
  return {
    type: AUTH_START,
  };
};

const authSuccess = (token, userId) => {
  return {
    type: AUTH_SUCCESS,
    token,
    userId,
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

const authUpdate = (username, avatar) => {
  return {
    type: AUTH_UPDATE,
    username,
    avatar,
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

const auth = (email, password, isLogin = false, username, avatar) => {
  return async (dispatch) => {
    await dispatch(authStart());
    if (isLogin) {
      try {
        const { idToken, expiresIn } = await loginFirebase(email, password);

        // get data user
        const { users } = await getUserFirebase(idToken);
        // debugger;

        dispatch(authSuccess(idToken, users[0].localId));

        dispatch(authUpdate(users[0].displayName, users[0].photoUrl));
        setTokenOnLocal(idToken, expiresIn);
        dispatch(checkAuthTimeout(expiresIn));
      } catch (error) {
        dispatch(authFail(error));
      }
    } else {
      try {
        const { idToken, localId, expiresIn } = await signUpFirebase(
          email,
          password
        );
        dispatch(authSuccess(idToken, localId));
        if (username || avatar) {
          const { displayName, photoUrl } = await updateUser(
            idToken,
            username,
            avatar
          );
          dispatch(authUpdate(displayName, photoUrl));
        }
        // console.log(await updateUser(idToken, "huu truong", "hahsdahsd"));

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

        // console.log("auto login");
        const { users } = await getUserFirebase(token);
        dispatch(authSuccess(token, users[0].localId));
        dispatch(authUpdate(users[0].displayName, users[0].photoUrl));
        const expirationTime = Math.round(
          (new Date(expirationDate).getTime() - new Date().getTime()) / 1000
        );
        dispatch(checkAuthTimeout(expirationTime));
      }
    }
  };
};

export { authFail, authSuccess, authStart, auth, autoLogin, authLogout };
