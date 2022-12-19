export const increment = (num) => {
  return {
    type: "INCREMENT",
    payload: num,
  };
};

export const decrement = () => {
  return {
    type: "DECREMENT",
  };
};

export const handleLoggin = () => {
  return {
    type: "SIGN_IN",
  };
};

export const handleUserInfo = (kilaza, r, userName) => {
  return {
    type: "KILAZA",
    kilaza: kilaza,
    r: r,
    userName: userName,
  };
};
