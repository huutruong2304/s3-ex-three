const key_value_token = "token";
export const removeTokenOnLocal = () => {
  localStorage.removeItem(key_value_token);
};

export const setTokenOnLocal = (token, expiresIn) => {
  let expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  localStorage.setItem(
    key_value_token,
    JSON.stringify({
      token: token,
      expirationDate: expirationDate,
    })
  );
};

export const getTokenOnLocal = () => {
  return localStorage.getItem(key_value_token);
};
