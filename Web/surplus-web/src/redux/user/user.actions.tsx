import UserActionTypes from "./user.types";
import ProfileModel from "../../models/Profile";
import ErrorModel from "../../models/Error";
import NotificationService from '../../services/Notification';
import { updateNotifications } from "../../redux/notification/notification.actions";

export const setCurrentUser = (user) => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user,
});

let notificationTimeoutId;
const notificationService = new NotificationService();

export const setCurrentUserAsync = (user) => {
  return dispatch => {
    dispatch(setCurrentUser(user));

    const getNotifications = async () => {      
      const notifications = await notificationService.getByEmail(user.Email);
      if (notifications instanceof ErrorModel) { 
               // handle error
      } else {        
        dispatch(updateNotifications(notifications)); 
      }   
      
      notificationTimeoutId = setTimeout(getNotifications, 20000);
    }

    if(!user.IsAuthenticated) {
      clearTimeout(notificationTimeoutId);
      dispatch(updateNotifications(Array<Notification>()));      
    }
    else {
      getNotifications();
    }
  };
};


