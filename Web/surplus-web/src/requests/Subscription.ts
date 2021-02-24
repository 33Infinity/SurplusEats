import BaseRequest from "./BaseRequest";
import Endpoints from "./Endpoints";
import HttpMethods from "./HttpMethods";

export default class Subscription extends BaseRequest {
  static async add(aSubscriptionModel) {
    let url = Endpoints.Subscription.add;
    const requestObject = this.buildRequestObject(
      HttpMethods.post,
      aSubscriptionModel
    );
    const json = await this.getJson(url, requestObject);
    return json;
  }

  static async delete(anId) {
    let url = Endpoints.Subscription.delete;
    const data = {
      Id: anId,
    };
    const requestObject = this.buildRequestObject(HttpMethods.post, data);
    const json = await this.getJson(url, requestObject);
    return json;
  }
}
