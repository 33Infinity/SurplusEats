import React from "react";
import MediaCard from "../../controls/MediaCard";
import InventoryModel from "../../models/Inventory";
import DefaultImage from "../../images/InventoryBlank.png";
import StringUtils from "../../utils/StringUtils";
import CartPlusMinus from "../../controls/CartPlusMinus";
import { addItemAsync } from "../../redux/cart/cart.actions";
import { connect } from "react-redux";
import CartModel from "../../models/Cart";
import ProfileModel from "../../models/Profile";

interface Props {
  inventoryItem: (InventoryModel | undefined) | null;
  currentUser: ProfileModel;
  addItem: (cartItem: CartModel) => void;
}

const UserInventoryItem: React.FC<Props> = ({
  inventoryItem,
  addItem,
  currentUser,
}) => {
  async function cartAdd(anAmount) {
    if (inventoryItem instanceof InventoryModel) {
      const cartItem = CartModel.NewCart(
        inventoryItem.Id,
        currentUser.Email,
        1,
        inventoryItem.Price,
        inventoryItem.ImageUrl,
        false,
        null,
        new Date()
      );
      addItem(cartItem);
    }
  }
  return (
    <div>
      <MediaCard
        title={StringUtils.valueOrDefault(inventoryItem?.Name, "")}
        text={StringUtils.valueOrDefault(
          inventoryItem && inventoryItem.Description,
          "No description provided"
        )}
        imageUrl={StringUtils.valueOrDefault(
          inventoryItem?.ImageUrl,
          DefaultImage
        )}
        price={inventoryItem?.Price}
      />
      <CartPlusMinus quantity={0} cartAdd={cartAdd} />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addItem: (cartItem) => dispatch(addItemAsync(cartItem)),
});

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps, mapDispatchToProps)(UserInventoryItem);
