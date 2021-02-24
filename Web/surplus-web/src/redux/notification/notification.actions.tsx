import NotificationTypes from './notification.types';
import NotificationService from "../../services/Notification";
import ErrorModel from "../../models/Error";

export const updateNotifications = notifications => ({
    type: NotificationTypes.UPDATE_NOTIFICATIONS,
    payload: notifications
});

export const markAsRead = (email) => {
    return (dispatch) => {
        const updateItems = async () => {           
            const notifications = await NotificationService.markAllAsRead("aaronspokane@gmail.com");
            if (notifications instanceof ErrorModel) {
                // handle error
              } else {
                dispatch(updateNotifications(notifications));
            }
        };

        updateItems();
    }
}