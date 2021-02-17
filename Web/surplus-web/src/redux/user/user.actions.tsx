import UserActionTypes from "./user.types";
import ErrorModel from "../../models/Error";
import NotificationService from "../../services/Notification";
import CartService from "../../services/Cart";
import { updateNotifications } from "../../redux/notification/notification.actions";
import { updateCartItems } from "../../redux/cart/cart.actions";
import NotificationModel from "../../models/Notification";
import CartModel from "../../models/Cart";

export const setCurrentUser = (user) => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user,
});

let notificationTimeoutId;

export const setCurrentUserAsync = (user) => {
  return (dispatch) => {
    dispatch(setCurrentUser(user));

    const getNotifications = async () => {
      const notifications = await NotificationService.getByEmail(user.Email);
      if (notifications instanceof ErrorModel) {
        // handle error
      } else {
        dispatch(updateNotifications(notifications));
      }

      notificationTimeoutId = setTimeout(getNotifications, 20000);
    };

    const getCartItems = async () => {
      const cartItems = await CartService.getByEmail(user.Email);
      if (cartItems instanceof ErrorModel) {
        // handle error
      } else {
        dispatch(updateCartItems(cartItems));
      }
    };

    if (!user.IsAuthenticated) {
      clearTimeout(notificationTimeoutId);
      dispatch(updateNotifications(Array<NotificationModel>()));
      dispatch(updateCartItems(Array<CartModel>()));
    } else {
      getNotifications();
      getCartItems();
    }
  };
};
