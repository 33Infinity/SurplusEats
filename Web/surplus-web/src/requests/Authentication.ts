import BaseRequest from "./BaseRequest";
import Endpoints from "./Endpoints";
import HttpMethods from "./HttpMethods";

export default class Authentication extends BaseRequest {
  async register(aProfileModel, aVendorModel) {
    let url = Endpoints.Authentication.register;
    const data = {
      Profile: aProfileModel,
      Vendor: aVendorModel,
    };
    const requestObject = this.buildRequestObject(HttpMethods.post, data);
    const json = await this.getJson(url, requestObject);
    return json;
  }
}
