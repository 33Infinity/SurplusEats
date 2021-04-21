import BaseService from "./BaseService";
import CartModel from "../models/Cart";
import ErrorModel from "../models/Error";
import CartRequest from "../requests/Cart";

export default class Cart extends BaseService {
  static async add(aCartModel) {
    const json = await CartRequest.add(aCartModel);
    return this.isApiError(json);
  }

  static async getByEmail(anEmail): Promise<CartModel[] | ErrorModel> {
    const json = await CartRequest.getByEmail(anEmail);
    if (json == null) return [];
    return !this.isApiError(json)
      ? this.buildCartModels(json)
      : ErrorModel.NewError(json.ErrorMessage);
  }

  static buildCartModels(someJson) {
    const cartModels: CartModel[] = [];
    for (let i = 0; i < someJson.length; i++) {
      cartModels.push(
        CartModel.NewCart(
          someJson[i].InventoryId,
          someJson[i].Email,
          someJson[i].Quantity,
          someJson[i].Price,
          someJson[i].ImageUrl,
          someJson[i].MarkedAsRead,
          someJson[i].InventoryDescription,
          someJson[i].Id,
          someJson[i].CreatedDate
        )
      );
    }
    return cartModels;
  }
}
