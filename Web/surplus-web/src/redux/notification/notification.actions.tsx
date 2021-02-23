import NotificationTypes from './notification.types';
import NotificationService from "../../services/Notification";
import ErrorModel from "../../models/Error";

export const updateNotifications = notifications => ({
    type: NotificationTypes.UPDATE_NOTIFICATIONS,
    payload: notifications
});

export const markAsRead = (notifyItems) => {
    return (dispatch) => {
        const updateItems = async () => {
            // should send list of Notifications then return the updated list
            const notifications = await NotificationService.getByEmail("aaronspokane@gmail.com");
            if (notifications instanceof ErrorModel) {
                // handle error
              } else {
                dispatch(updateNotifications(notifications));
            }
        };

        updateItems();
    }
}