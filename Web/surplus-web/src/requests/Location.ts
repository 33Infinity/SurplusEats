import BaseRequest from "./BaseRequest";
import Endpoints from "./Endpoints";
import HttpMethods from "./HttpMethods";

export default class Location extends BaseRequest {
  async getByVendor(aVendorId) {
    const url = Endpoints.Location.getByVendor;
    const data = {
      VendorId: aVendorId,
    };
    const requestObject = this.buildRequestObject(HttpMethods.post, data);
    const json = await this.getJson(url, requestObject);
    return json;
  }
}
