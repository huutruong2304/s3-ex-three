import {
  USER_SET,
  USER_CREATE,
  USER_UPDATE,
  USER_REMOVE,
} from "./action-types";
import { users as usersData } from "../../data/users";

import { v1 as uuidv1 } from "uuid";

const userSet = (users) => {
  return {
    type: USER_SET,
    users,
  };
};

const userCreate = (username, email, avatar) => {
  return {
    type: USER_CREATE,
    id: uuidv1(),
    username,
    email,
    avatar,
  };
};

const userUpdate = (users, id, username, email, avatar) => {
  let newUsers = users.map((user) => {
    if (id === user.id) {
      return {
        ...user,
        username,
        email,
        avatar,
      };
    }
    return user;
  });
  return {
    type: USER_UPDATE,
    users: newUsers,
  };
};

const userRemove = (users) => {
  return {
    type: USER_REMOVE,
    users,
  };
};

const initUserData = () => {
  return (dispatch) => {
    dispatch(userSet(usersData));
  };
};

const removeUserById = (users, id) => {
  let newUsers = users.filter((user) => user.id !== id);
  return (dispatch) => {
    dispatch(userRemove(newUsers));
  };
};

export { initUserData, userCreate, removeUserById, userUpdate };
