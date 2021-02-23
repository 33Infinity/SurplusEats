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
    aPrice,
    anImageUrl,
    isMarkedAsRead,
    anInventoryDescription
  ) {
    const currentQuantity = await CartDAO.getCurrentQuantiyByEmailAndInventoryId(
      admin,
      anEmail,
      anInventoryId
    );
    const cartTO = CartTO.NewCart(
      anInventoryId,
      anEmail,
      currentQuantity + 1,
      aPrice,
      anImageUrl,
      isMarkedAsRead,
      anInventoryDescription,
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
    anInventoryDescription,
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
      anInventoryDescription,
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
