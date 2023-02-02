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

export const handleUserInfo = (userName, r, weight,  gameCreator, roomID) => {
  return {
    type: USER_INFO,
    payload: {
      userName: userName,
      weight: weight,
      r: r,
      roomID: roomID,
      gameCreator: gameCreator,
    },
  };
};
