import NotificationTypes from './notification.types';
import { updateNotifications } from './notification.utils';

const INITIAL_STATE = {
    notifications: []
};

const notificationReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case NotificationTypes.UPDATE_NOTIFICATIONS: 
        return {
            ...state,
            notifications: updateNotifications(state.notifications, action.payload)
        }
        default:
            return state
    }
};

export default notificationReducer;