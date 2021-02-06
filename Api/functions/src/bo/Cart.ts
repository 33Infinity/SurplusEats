import CartDAO from "../datastore/dao/Cart";
import CartTO from "../datastore/to/Cart";

export default class Notfication {
  static async getByEmail(admin, anEmail) {
    const cartItems = await CartDAO.getByEmail(admin, anEmail);
    return cartItems;
  }

  static async add(
    admin,
    anInventoryId,
    anEmail,
    aQuantity,
    aPrice,
    anImageUrl,
    isMarkedAsRead
  ) {
    const cartTO = CartTO.NewCart(
      anInventoryId,
      anEmail,
      aQuantity,
      aPrice,
      anImageUrl,
      isMarkedAsRead,
      null,
      new Date()
    );
    const response = await CartDAO.add(admin, cartTO);
    return response;
  }

  static async update(
    admin,
    anInventoryId,
    anEmail,
    aQuantity,
    aPrice,
    anImageUrl,
    isMarkedAsRead,
    anId,
    aCreatedDate
  ) {
    const notificationTO = CartTO.NewCart(
      anInventoryId,
      anEmail,
      aQuantity,
      aPrice,
      anImageUrl,
      isMarkedAsRead,
      anId,
      aCreatedDate
    );
    const resp = await CartDAO.update(admin, anId, notificationTO.getTuple());
    return resp;
  }

  static async delete(admin, anId) {
    const resp = await CartDAO.delete(admin, anId);
    return resp;
  }
}
