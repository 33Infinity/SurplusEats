import BaseRequest from "./BaseRequest";
import Endpoints from "./Endpoints";
import HttpMethods from "./HttpMethods";

export default class Notification extends BaseRequest {
  static async add(aNotificationModel) {
    let url = Endpoints.Notification.add;
    const requestObject = this.buildRequestObject(
      HttpMethods.post,
      aNotificationModel
    );
    const json = await this.getJson(url, requestObject);
    return json;
  }

  static async delete(aNotificationId) {
    let url = Endpoints.Notification.delete;
    const data = {
      Notification: aNotificationId,
    };
    const requestObject = this.buildRequestObject(HttpMethods.post, data);
    const json = await this.getJson(url, requestObject);
    return json;
  }

  static async getByEmail(anEmail) {
    const url = Endpoints.Notification.getByEmail;
    const data = {
      Email: anEmail,
    };
    const requestObject = this.buildRequestObject(HttpMethods.post, data);
    const json = await this.getJson(url, requestObject);
    return json;
  }

  static async markAllAsRead(anEmail) {
    const url = Endpoints.Notification.markAllAsRead;
    const data = {
      Email: anEmail,
    };
    const requestObject = this.buildRequestObject(HttpMethods.post, data);
    const json = await this.getJson(url, requestObject);
    return json;
  }

  static async update(aNotificationModel) {
    let url = Endpoints.Notification.update;
    const requestObject = this.buildRequestObject(
      HttpMethods.post,
      aNotificationModel
    );
    const json = await this.getJson(url, requestObject);
    return json;
  }
}
