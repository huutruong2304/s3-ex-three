const key_value_user = "user";
export const removeTokenOnLocal = () => {
  localStorage.removeItem(key_value_user);
};

export const setTokenOnLocal = (token, userId) => {
  localStorage.setItem(
    key_value_user,
    JSON.stringify({
      token: token,
      userId: userId,
    })
  );
};

export const getTokenOnLocal = () => {
  return JSON.parse(localStorage.getItem(key_value_user));
};
