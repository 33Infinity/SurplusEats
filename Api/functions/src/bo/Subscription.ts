import SubscriptionTO from "../datastore/to/Subscription";
import SubscriptionDAO from "../datastore/dao/Subscription";

export default class Subscription {
  static async add(admin, anEmail, anInventoryId) {
    const notificationTO = SubscriptionTO.NewSubscription(
      anEmail,
      anInventoryId,
      null,
      new Date()
    );
    const response = await SubscriptionDAO.add(admin, notificationTO);
    return response;
  }

  static async delete(admin, anId) {
    const resp = await SubscriptionDAO.delete(admin, anId);
    return resp;
  }
}
