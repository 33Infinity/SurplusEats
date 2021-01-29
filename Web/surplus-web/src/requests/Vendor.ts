import BaseRequest from "./BaseRequest";
import Endpoints from "./Endpoints";
import HttpMethods from "./HttpMethods";

export default class Vendor extends BaseRequest {
  async getByEmail(anEmail) {
    const url = Endpoints.Vendor.getByEmail;
    const data = {
      Email: anEmail,
    };
    const requestObject = this.buildRequestObject(HttpMethods.post, data);
    const json = await this.getJson(url, requestObject);
    return json;
  }

  async update(aVendorModel) {
    const url = Endpoints.Vendor.update;
    const requestObject = this.buildRequestObject(
      HttpMethods.post,
      aVendorModel
    );
    const json = await this.getJson(url, requestObject);
    return json;
  }
}
