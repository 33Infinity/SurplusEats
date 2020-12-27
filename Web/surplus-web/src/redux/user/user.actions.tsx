import UserActionTypes from "./user.types";
import ProfileModel from "../../models/ProfileModel";

export const setCurrentUser = (user) => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user,
});

export const authenticateCurrentUserAsync = () => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(
        setCurrentUser(
          new ProfileModel("", "", "", "Aaron", "Flores", "", true, null, null)
        )
      );
    }, 7000);
  };
};
