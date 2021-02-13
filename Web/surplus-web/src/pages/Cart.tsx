import React from "react";
import { connect } from "react-redux";
import { selectCartItems } from "../redux/cart/cart.selectors";

const Cart: React.FC = () => {
  return <div>Cart Page</div>;
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
  cartItems: selectCartItems(state),
});

export default connect(mapStateToProps)(Cart);
