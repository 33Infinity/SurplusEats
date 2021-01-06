import BaseRequest from "./BaseRequest";
import Endpoints from "./Endpoints";
import HttpMethods from "./HttpMethods";

export default class Inventory extends BaseRequest {
  async getByLocation(aLat, aLon) {
    const url = Endpoints.Inventory.getByLocation;
    const data = {
      Latitude: aLat,
      Longitude: aLon,
    };
    const requestObject = this.buildRequestObject(HttpMethods.post, data);
    const json = await this.getJson(url, requestObject);
    return json;
  }

  async getByVendorLocation(aVendorId, aLocationId) {
    let url = Endpoints.Inventory.getByVendorLocation;
    const data = {
      VendorId: aVendorId,
      LocationId: aLocationId,
    };
    const requestObject = this.buildRequestObject(HttpMethods.post, data);
    const json = await this.getJson(url, requestObject);
    return json;
  }

  async addInventory(anInventoryModel) {
    let url = Endpoints.Inventory.addInventory;
    const requestObject = this.buildRequestObject(
      HttpMethods.post,
      anInventoryModel
    );
    const json = await this.getJson(url, requestObject);
    return json;
  }

  async deleteInventory(anInventoryId) {
    let url = Endpoints.Inventory.deleteInventory;
    const data = {
      InventoryId: anInventoryId,
    };
    const requestObject = this.buildRequestObject(HttpMethods.post, data);
    const json = await this.getJson(url, requestObject);
    return json;
  }
}
