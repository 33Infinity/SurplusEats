import BaseTable from "./BaseTable";

export default class Subscription extends BaseTable {
  public static TableName = "subscription";

  static ColumnNames = class {
    public static Email = "Email";
    public static InventoryId = "InventoryId";
  };

  Email: string;
  InventoryId: string;

  private constructor(anEmail, anInventoryId, anId, aCreatedDate) {
    super(anId, aCreatedDate);
    this.Email = anEmail;
    this.InventoryId = anInventoryId;
  }

  public static NewSubscription(
    anEmail,
    anInventoryId,
    anId,
    aCreatedDate
  ): Subscription {
    return new Subscription(anEmail, anInventoryId, anId, aCreatedDate);
  }

  getTuple() {
    return {
      Email: this.Email,
      InventoryId: this.InventoryId,
      CreatedDate: this.CreatedDate,
    };
  }
}
