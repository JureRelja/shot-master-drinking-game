import { USER_INFO } from "../action_types";
const INITIAL_STATE = {};

const getUserInfo = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_INFO:
      state = action.payload;
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default getUserInfo;
