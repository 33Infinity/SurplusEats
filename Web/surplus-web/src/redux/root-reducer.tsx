import { combineReducers } from 'redux';
import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';
import loadingReducer from './loading/loading.reducer';

export default combineReducers({
    user: userReducer,
    cart: cartReducer,
    loading: loadingReducer
})