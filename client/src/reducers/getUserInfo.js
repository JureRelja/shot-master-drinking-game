const getUserInfo = (state = "", action) => {
    switch (action.type) {
      case "KILAZA":
        return [...state, action.payload];
      default:
        return state;
    }
  };
  
  export default getUserInfo;