import { createSelector } from 'reselect';

const selectNotifications = state => state.notification;

export const notificationsItems = createSelector(
    [selectNotifications],
    (notification) => notification.notifications
);

export const newNotificationCount = createSelector(
    [notificationsItems],
    (notificationsItems) => {
        return notificationsItems?.find(x => x.isMarkedAsRead === false)?.length ?? 0
    }
)