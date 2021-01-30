import NotificationDAO from "../datastore/dao/Notification";

export default class Notfication {
  static async getByEmail(admin, anEmail) {
    const notifications = await NotificationDAO.getByEmail(admin, anEmail);
    return notifications;
  }
}
