import { INCREMENT, DECREMENT, USER_INFO } from "../action_types";

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

export const handleUserInfo = (userName, r, kilaza,  gameCreator, roomID) => {
  return {
    type: USER_INFO,
    payload: {
      userName: userName,
      kilaza: kilaza,
      r: r,
      roomID: roomID,
      gameCreator: gameCreator,
    },
  };
};
