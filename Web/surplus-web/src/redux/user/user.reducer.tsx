import ProfileModel from "../../models/ProfileModel";

const INITIAL_PROFILE = {
  currentUser: new ProfileModel("", "", "", "", "", "", false),
};

const userReducer = (state = INITIAL_PROFILE, action) => {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return {
        ...state,
        currentUser: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
