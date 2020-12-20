import BaseRequest from "./BaseRequest";
import Endpoints from "./Endpoints";
import HttpMethods from "./HttpMethods";

export default class Inventory extends BaseRequest {
  async getByLocation() {
    const url = Endpoints.getByLocation;
    const requestObject = this.buildRequestObject(HttpMethods.get, "");
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
