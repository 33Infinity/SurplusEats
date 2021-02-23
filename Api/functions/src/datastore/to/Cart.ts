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
    public static InventoryDescription = "InventoryDescription";
  };

  InventoryId: string;
  Email: string;
  Quantity: number;
  Price: number;
  ImageUrl: string;
  MarkedAsRead: boolean;
  InventoryDescription: string;

  private constructor(
    anInventoryId,
    anEmail,
    aQuantity,
    aPrice,
    anImageUrl,
    isMarkedAsRead,
    anInventoryDescription,
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
    this.InventoryDescription = anInventoryDescription;
  }

  public static NewCart(
    anInventoryId,
    anEmail,
    aQuantity,
    aPrice,
    anImageUrl,
    isMarkedAsRead,
    anInventoryDescription,
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
      anInventoryDescription,
      anId,
      aCreatedDate
    );
  }

  getTuple() {
    return {
      InventoryId: this.InventoryId,
      Email: this.Email,
      Quantity: this.Quantity,
      Price: this.Price,
      ImageUrl: this.ImageUrl,
      MarkedAsRead: this.MarkedAsRead,
      InventoryDescription: this.InventoryDescription,
      CreatedDate: this.CreatedDate,
    };
  }
}
