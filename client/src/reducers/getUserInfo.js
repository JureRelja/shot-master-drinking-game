import { mapKeys } from "lodash";
const INITIAL_STATE = {};

const getUserInfo = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "KILAZA":
      state = action.payload;
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default getUserInfo;
