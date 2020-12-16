import InventoryModel from "../models/Inventory";
import BaseRequest from "./BaseRequest";

export default class Inventory extends BaseRequest {
  async getByLocation() {
    let url =
      "https://us-central1-surplus-functions.cloudfunctions.net/inventory-getByLocation";
    /* let inventoryModel = InventoryModel.NewInventory(
        aDescription,
        aPrice,
        aQuantity,
      ); */
    let inventoryModels: InventoryModel[] = [];
    const json = await this.getJson(url);
    for (let i = 0; i < json.length; i++) {
      let inventoryModel = InventoryModel.NewInventory(
        json[i].Description,
        json[i].Price,
        json[i].Quantity
      );
      inventoryModels.push(inventoryModel);
    }
    return inventoryModels;
  }
}
