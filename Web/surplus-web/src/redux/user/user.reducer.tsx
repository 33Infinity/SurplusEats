import ProfileModel from "../../models/Profile";
import UserActionTypes from "./user.types";

const INITIAL_PROFILE = {
  currentUser: {} as ProfileModel,
};

const userReducer = (state = INITIAL_PROFILE, action) => {
  switch (action.type) {
    case UserActionTypes.AUTHENTICATE_CURRENT_USER:
      return {
        ...state,
      };
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
