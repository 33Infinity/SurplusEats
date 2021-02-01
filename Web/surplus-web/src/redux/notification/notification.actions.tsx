import NotificationTypes from './notification.types';

export const updateNotifications = notifications => ({
    type: NotificationTypes.UPDATE_NOTIFICATIONS,
    payload: notifications
});