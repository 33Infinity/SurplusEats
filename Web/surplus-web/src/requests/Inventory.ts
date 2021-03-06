import BaseRequest from "./BaseRequest";
import Endpoints from "./Endpoints";
import HttpMethods from "./HttpMethods";

export default class Inventory extends BaseRequest {
  static async add(anInventoryModel) {
    let url = Endpoints.Inventory.add;
    const requestObject = this.buildRequestObject(
      HttpMethods.post,
      anInventoryModel
    );
    console.log(requestObject.body);
    const json = await this.getJson(url, requestObject);
    return json;
  }

  static async delete(anInventoryId) {
    let url = Endpoints.Inventory.delete;
    const data = {
      InventoryId: anInventoryId,
    };
    const requestObject = this.buildRequestObject(HttpMethods.post, data);
    const json = await this.getJson(url, requestObject);
    return json;
  }

  static async getById(anId) {
    let url = Endpoints.Inventory.getById;
    const data = {
      InventoryId: anId,
    };
    const requestObject = this.buildRequestObject(HttpMethods.post, data);
    const json = await this.getJson(url, requestObject);
    return json;
  }

  static async getByLocation(aLat, aLon) {
    const url = Endpoints.Inventory.getByLocation;
    const data = {
      Latitude: aLat,
      Longitude: aLon,
    };
    const requestObject = this.buildRequestObject(HttpMethods.post, data);
    const json = await this.getJson(url, requestObject);
    return json;
  }

  static async getByVendorLocation(aVendorId, aLocationId) {
    let url = Endpoints.Inventory.getByVendorLocation;
    const data = {
      VendorId: aVendorId,
      LocationId: aLocationId,
    };
    const requestObject = this.buildRequestObject(HttpMethods.post, data);
    const json = await this.getJson(url, requestObject);
    return json;
  }

  static async update(anInventoryModel) {
    let url = Endpoints.Inventory.update;
    const requestObject = this.buildRequestObject(
      HttpMethods.post,
      anInventoryModel
    );
    const json = await this.getJson(url, requestObject);
    return json;
  }
}
