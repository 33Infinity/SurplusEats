import { combineReducers } from 'redux';
import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';
import notificationReducer from './notification/notification.reducer';

export default combineReducers({
    user: userReducer,
    cart: cartReducer,
    notifications: notificationReducer
})