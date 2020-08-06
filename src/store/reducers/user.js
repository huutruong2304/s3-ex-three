import {
  USER_REMOVE,
  USER_UPDATE,
  USER_CREATE,
  USER_SET,
} from "../actions/action-types";
import { updatedObject } from "../utility";

const userInitialState = {
  users: [],
};

const userSet = (state, action) => {
  return updatedObject(state, {
    users: action.users,
  });
};
const userCreate = (state, action) => {
  return updatedObject(state, {
    users: [
      {
        id: action.id,
        username: action.username,
        email: action.email,
        avatar: action.avatar,
      },
      ...state.users,
    ],
  });
};

const userUpdate = (state, action) => {
  return updatedObject(state, {
    users: action.users,
  });
};

const userRemove = (state, action) => {
  return updatedObject(state, {
    users: action.users,
  });
};

export const userReducer = (state = userInitialState, action) => {
  switch (action.type) {
    case USER_CREATE:
      return userCreate(state, action);
    case USER_SET:
      return userSet(state, action);
    case USER_REMOVE:
      return userRemove(state, action);
    case USER_UPDATE:
      return userUpdate(state, action);
    default:
      return state;
  }
};
