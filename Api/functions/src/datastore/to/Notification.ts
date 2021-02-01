import BaseTable from "./BaseTable";

export default class Notification extends BaseTable {
  public static TableName = "notificationUser";

  static ColumnNames = class {
    public static NotificationId = "NotificationId";
    public static Email = "Email";
    public static Subject = "Subject";
    public static Message = "Message";
    public static MarkedAsRead = "MarkedAsRead";
  };

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

  getTuple() {
    return {
      NotificationId: this.NotificationId,
      Email: this.Email,
      Subject: this.Subject,
      Message: this.Message,
      MarkedAsRead: this.MarkedAsRead,
      CreatedDate: this.CreatedDate,
    };
  }
}
