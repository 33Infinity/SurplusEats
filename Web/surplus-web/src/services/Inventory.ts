import InventoryRequest from "../requests/Inventory";
import InventoryModel from "../Models/Inventory";
export default class Inventory {
  async getByLocation(): Promise<InventoryModel[] | void> {
    let request = new InventoryRequest();
    let response = await request.getByLocation();
    return response;
  }
}
