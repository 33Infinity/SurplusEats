import NotificationDAO from "../datastore/dao/Notification";
import NotificationTO from "../datastore/to/Notification";

export default class Notfication {
  static async add(
    admin,
    aNotificationId,
    anEmail,
    aSubject,
    aMessage,
    isMarkedAsRead
  ) {
    const notificationTO = NotificationTO.NewNotification(
      aNotificationId,
      anEmail,
      aSubject,
      aMessage,
      isMarkedAsRead,
      null,
      new Date()
    );
    const response = await NotificationDAO.add(admin, notificationTO);
    return response;
  }

  static async delete(admin, aNotificationId) {
    const resp = await NotificationDAO.delete(admin, aNotificationId);
    return resp;
  }

  static async getByEmail(admin, anEmail) {
    const notifications = await NotificationDAO.getByEmail(admin, anEmail);
    return notifications;
  }

  static async markAllAsRead(admin, anEmail) {
    const notifications = await NotificationDAO.markAllAsRead(admin, anEmail);
    return notifications;
  }

  static async update(
    admin,
    aNotificationId,
    anEmail,
    aSubject,
    aMessage,
    isMarkedAsRead,
    anId,
    aCreatedDate
  ) {
    const notificationTO = NotificationTO.NewNotification(
      aNotificationId,
      anEmail,
      aSubject,
      aMessage,
      isMarkedAsRead,
      anId,
      aCreatedDate
    );
    const resp = await NotificationDAO.update(
      admin,
      aNotificationId,
      notificationTO.getTuple()
    );
    return resp;
  }
}
