import BaseService from "./BaseService";
import SubscriptionRequest from "../requests/Subscription";
import SubscriptionModel from "../models/Subscription";

export default class Subscription extends BaseService {
  static async add(aSubscriptionModel: SubscriptionModel) {
    const json = await SubscriptionRequest.add(aSubscriptionModel);
    return this.isApiError(json);
  }

  static async delete(anId) {
    const json = await SubscriptionRequest.delete(anId);
    return this.isApiError(json);
  }
}
