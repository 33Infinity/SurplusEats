import BaseTable from "./BaseTable";

export default class Notification extends BaseTable {
  public static TableName = "notificationUser";

  static ColumnNames = class {
    public static NotificationId = "NotificationId";
    public static Email = "Email";
    public static Subject = "Subject";
    public static Message = "Message";
    public static MarkedAsRead = "MarkedAsRead";
    public static InventoryId = "InventoryId";
  };

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

  getTuple() {
    return {
      NotificationId: this.NotificationId,
      Email: this.Email,
      Subject: this.Subject,
      Message: this.Message,
      MarkedAsRead: this.MarkedAsRead,
      InventoryId: this.InventoryId,
      CreatedDate: this.CreatedDate,
    };
  }
}
