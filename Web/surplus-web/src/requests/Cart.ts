import BaseRequest from "./BaseRequest";
import Endpoints from "./Endpoints";
import HttpMethods from "./HttpMethods";

export default class Cart extends BaseRequest {
  static async getByEmail(anEmail) {
    const url = Endpoints.Cart.getByEmail;
    const data = {
      Email: anEmail,
    };
    const requestObject = this.buildRequestObject(HttpMethods.post, data);
    const json = await this.getJson(url, requestObject);
    return json;
  }

  static async add(aCartModel) {
    let url = Endpoints.Cart.add;
    const requestObject = this.buildRequestObject(HttpMethods.post, aCartModel);
    const json = await this.getJson(url, requestObject);
    return json;
  }
}
