import BaseModel from "./Base";

export default class Notification extends BaseModel {
  NotificationId: string;
  Email: string;
  Subject: string;
  Message: string;
  MarkedAsRead: boolean;
  InventoryId: string;
  private constructor(
    aNotificationId,
    anEmail,
    aSubject,
    aMessage,
    isMarkedAsRead,
    anInventoryId,
    anId,
    aCreatedDate
  ) {
    super(anId, aCreatedDate);
    this.NotificationId = aNotificationId;
    this.Email = anEmail;
    this.Subject = aSubject;
    this.Message = aMessage;
    this.MarkedAsRead = isMarkedAsRead;
    this.InventoryId = anInventoryId;
  }
  public static NewNotification(
    aNotificationId,
    anEmail,
    aSubject,
    aMessage,
    isMarkedAsRead,
    anInventoryId,
    anId,
    aCreatedDate
  ): Notification {
    return new Notification(
      aNotificationId,
      anEmail,
      aSubject,
      aMessage,
      isMarkedAsRead,
      anInventoryId,
      anId,
      aCreatedDate
    );
  }
}
