import Notification from '../../models/Notification';

export const updateNotifications = (notifications: Array<Notification>, notificationsToAdd: Array<Notification>) => {
  return notificationsToAdd.filter(x => {
        return notifications.filter(y => y.NotificationId === x.NotificationId).length <= 0
   });   
};