import * as actionTypes from "../actions/action-types";
import { updatedObject } from "../utility";
const authInitialState = {
  token: null,
  userId: null,
  username: "Mr.X",
  avatar:
    "https://static01.nyt.com/newsgraphics/2019/08/01/candidate-pages/b4522271a4f73426d5de7437ff4d0aa6b616b469/trump.jpg",
  error: null,
  loading: false,
};

const authStart = (state, action) => {
  return updatedObject(state, { error: null, loading: true });
};

const authSuccess = (state, action) => {
  return updatedObject(state, {
    token: action.token,
    userId: action.userId,
    error: null,
    loading: true,
  });
};
const authFail = (state, action) => {
  return updatedObject(state, {
    error: action.error,
    loading: false,
  });
};

const authLogout = (state, action) => {
  return updatedObject(state, {
    token: null,
    userId: null,
    loading: false,
    error: null,
  });
};

const authUpdate = (state, action) => {
  return updatedObject(state, {
    username: action.username,
    avatar: action.avatar,
    loading: false,
  });
};

export const authReducer = (state = authInitialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    case actionTypes.AUTH_UPDATE:
      return authUpdate(state, action);
    default:
      return state;
  }
};
