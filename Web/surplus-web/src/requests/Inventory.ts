import BaseRequest from "./BaseRequest";

export default class Inventory extends BaseRequest {
  async getByLocation() {
    let url = "";
    /* let inventoryModel = InventoryModel.NewInventory(
        aDescription,
        aPrice,
        aQuantity,
      ); */
    const json = await this.getJson(url);
    return json;
  }
}
