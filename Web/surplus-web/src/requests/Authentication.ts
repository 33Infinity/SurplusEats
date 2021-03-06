import BaseRequest from "./BaseRequest";
import Endpoints from "./Endpoints";
import HttpMethods from "./HttpMethods";

export default class Authentication extends BaseRequest {
  static async register(aProfileModel, aVendorModel) {
    let url = Endpoints.Authentication.register;
    const data = {
      Profile: aProfileModel,
      Vendor: aVendorModel,
    };
    const requestObject = this.buildRequestObject(HttpMethods.post, data);
    const json = await this.getJson(url, requestObject);
    return json;
  }

  static async signIn(anEmail, aPassword) {
    let url = Endpoints.Authentication.signIn;
    const data = {
      Email: anEmail,
      Password: aPassword,
    };
    const requestObject = this.buildRequestObject(HttpMethods.post, data);
    const json = await this.getJson(url, requestObject);
    return json;
  }

  static async getProfile(anEmail) {
    let url = Endpoints.Authentication.getProfile;
    const data = {
      Email: anEmail,
    };
    const requestObject = this.buildRequestObject(HttpMethods.post, data);
    const json = await this.getJson(url, requestObject);
    return json;
  }
}
