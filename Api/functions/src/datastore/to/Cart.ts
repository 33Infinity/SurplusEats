import BaseTable from "./BaseTable";

export default class Cart extends BaseTable {
  public static TableName = "cart";

  static ColumnNames = class {
    public static InventoryId = "InventoryId";
    public static Email = "Email";
    public static Quantity = "Quantity";
    public static Price = "Price";
    public static ImageUrl = "ImageUrl";
    public static MarkedAsRead = "MarkedAsRead";
  };

  InventoryId: string;
  Email: string;
  Quantity: number;
  Price: number;
  ImageUrl: string;
  MarkedAsRead: boolean;

  private constructor(
    anInventoryId,
    anEmail,
    aQuantity,
    aPrice,
    anImageUrl,
    isMarkedAsRead,
    anId,
    aCreatedDate
  ) {
    super(anId, aCreatedDate);
    this.InventoryId = anInventoryId;
    this.Email = anEmail;
    this.Quantity = aQuantity;
    this.Price = aPrice;
    this.ImageUrl = anImageUrl;
    this.MarkedAsRead = isMarkedAsRead;
  }

  public static NewCart(
    anInventoryId,
    anEmail,
    aQuantity,
    aPrice,
    anImageUrl,
    isMarkedAsRead,
    anId,
    aCreatedDate
  ): Cart {
    return new Cart(
      anInventoryId,
      anEmail,
      aQuantity,
      aPrice,
      anImageUrl,
      isMarkedAsRead,
      anId,
      aCreatedDate
    );
  }

  getTuple() {
    return {
      NotificationId: this.InventoryId,
      Email: this.Email,
      Quantity: this.Quantity,
      Price: this.Price,
      ImageUrl: this.ImageUrl,
      MarkedAsRead: this.MarkedAsRead,
      CreatedDate: this.CreatedDate,
    };
  }
}
