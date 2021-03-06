import CartActionTypes from "./cart.types";
import { addItemToCart } from "./cart.utils";

const INITAL_STATE = {
  cartItems: [],
};

const cartReducer = (state = INITAL_STATE, action) => {
  switch (action.type) {
    case CartActionTypes.ADD_ITEM:
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, action.payload),
      };
    case CartActionTypes.UPDATE_ITEMS:
      return {
        ...state,
        cartItems: action.payload,
      };
    default:
      return state;
  }
};

export default cartReducer;
