const getUserInfo = (state = "", action) => {
    switch (action.type) {
      case "KILAZA":
        return action.kilaza, action.r, action.userName;
      default:
        return state;
    }
  };
  
  export default getUserInfo;