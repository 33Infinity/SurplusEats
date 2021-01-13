import UserActionTypes from "./user.types";
import ProfileModel from "../../models/Profile";

export const setCurrentUser = (user) => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user,
});

export const authenticateCurrentUserAsync = () => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(
        setCurrentUser(
          ProfileModel.NewProfile(
            "",
            "",
            "",
            "Aaron",
            "Flores",
            "",
            true,
            false
          )
        )
      );
    }, 7000);
  };
};
