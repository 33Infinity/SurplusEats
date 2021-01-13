import BaseRequest from "./BaseRequest";
import Endpoints from "./Endpoints";
import HttpMethods from "./HttpMethods";

export default class Authentication extends BaseRequest {
  async register(aProfileModel) {
    let url = Endpoints.Authentication.register;
    const requestObject = this.buildRequestObject(
      HttpMethods.post,
      aProfileModel
    );
    const json = await this.getJson(url, requestObject);
    return json;
  }
}
