import Base from "./Base";

export default class Subscription extends Base {
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
}
