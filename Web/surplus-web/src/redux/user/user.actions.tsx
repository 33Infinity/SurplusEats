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
          ProfileModel.NewNonVendor("", "", "", "Aaron", "Flores", "", true)
        )
      );
    }, 7000);
  };
};
