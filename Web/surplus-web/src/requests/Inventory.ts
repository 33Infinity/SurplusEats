import BaseRequest from "./BaseRequest";
import Endpoints from "./Endpoints";
import HttpMethods from "./HttpMethods";

export default class Inventory extends BaseRequest {
  async getByLocation(aLat, aLon) {
    const url = Endpoints.getByLocation;
    var data = {
      Latitude: aLat,
      Longitude: aLon,
    };
    const requestObject = this.buildRequestObject(HttpMethods.post, data);
    const json = await this.getJson(url, requestObject);
    return json;
  }

  async getByVendor(aVendorModel) {
    let url = Endpoints.getByLocation;
    const requestObject = this.buildRequestObject(
      HttpMethods.get,
      aVendorModel
    );
    const json = await this.getJson(url, requestObject);
    return json;
  }
}
