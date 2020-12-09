import CartActionTypes from './cart.types';

const INITAL_STATE = {
    cartItems: []
};

const cartReducer = (state = INITAL_STATE, action) => {
    switch(action.type) {
        case CartActionTypes.ADD_ITEM: 
            return {
                ...state,
                cartItems: [...state.cartItems, action.payload]
            }
        default:
            return state;
    }
};

export default cartReducer;