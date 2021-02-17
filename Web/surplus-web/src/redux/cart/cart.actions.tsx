import CartActionTypes from "./cart.types";
import CartService from "../../services/Cart";

export const addItem = (item) => ({
  type: CartActionTypes.ADD_ITEM,
  payload: item,
});

export const updateCartItems = (items) => ({
  type: CartActionTypes.UPDATE_ITEMS,
  payload: items,
});

export const addItemAsync = (cartItem) => {
  return (dispatch) => {
    const addCartItem = async () => {
      const addedItem = await CartService.add(cartItem);
      if (addedItem) {
        dispatch(addItem(addedItem));
      }
    };
    addCartItem();
  };
};
