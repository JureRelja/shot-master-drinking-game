import { INCREMENT, DECREMENT, KILAZA } from "../action_types";

export const increment = (num) => {
  return {
    type: INCREMENT,
    payload: num,
  };
};

export const decrement = () => {
  return {
    type: DECREMENT,
  };
};

export const handleLoggin = () => {
  return {
    type: "SIGN_IN",
  };
};

export const handleUserInfo = (userName, r, kilaza) => {
  return {
    type: KILAZA,
    payload: {
      userName: userName,
      kilaza: kilaza,
      r: r,
    },
  };
};
