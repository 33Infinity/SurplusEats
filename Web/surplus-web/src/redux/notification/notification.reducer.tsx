import NotificationTypes from './notification.types';
import { updateNotifications } from './notification.utils';
import Notification from '../../models/Notification';

const INITIAL_STATE = {
    notifications: new Array<Notification>() 
};

const notificationReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case NotificationTypes.UPDATE_NOTIFICATIONS: 
        return {
            ...state,
            notifications: action.payload
        }
        default:
            return state
    }
};

export default notificationReducer;