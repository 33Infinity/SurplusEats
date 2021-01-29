import BaseModel from "./Base";

export default class Notification extends BaseModel {
  NotificationId: string;
  Email: string;
  Subject: string;
  Message: string;
  MarkedAsRead: boolean;
  private constructor(
    aNotificationId,
    anEmail,
    aSubject,
    aMessage,
    isMarkedAsRead,
    anId,
    aCreatedDate
  ) {
    super(anId, aCreatedDate);
    this.NotificationId = aNotificationId;
    this.Email = anEmail;
    this.Subject = aSubject;
    this.Message = aMessage;
    this.MarkedAsRead = isMarkedAsRead;
  }
  public static NewNotification(
    aNotificationId,
    anEmail,
    aSubject,
    aMessage,
    isMarkedAsRead,
    anId,
    aCreatedDate
  ): Notification {
    return new Notification(
      aNotificationId,
      anEmail,
      aSubject,
      aMessage,
      isMarkedAsRead,
      anId,
      aCreatedDate
    );
  }
}
