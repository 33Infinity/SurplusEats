import { createSelector } from 'reselect';

const selectNotifications = state => state.notification;

export const notificationsItems = createSelector(
    [selectNotifications],
    (notification) => notification.notifications
);

export const newNotificationCount = createSelector(
    [notificationsItems],
    (notificationsItems) => {
        const count = notificationsItems?.filter(x => x.MarkedAsRead === false).length ?? 0;
        return count;
    }
)