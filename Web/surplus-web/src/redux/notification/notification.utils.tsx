import Notification from '../../models/Notification';

export const updateNotifications = (notifications: Array<Notification>, notificationsToAdd: Array<Notification>) => {
    const unreadNotifications = notifications ?? Array<Notification>();
  
   const newNotifications = notificationsToAdd.filter(x => {
        return notifications.filter(y => y.NotificationId === x.NotificationId).length <= 0
   });   

   return [...unreadNotifications, ...newNotifications];
};