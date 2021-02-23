import Base from "./Base";

export default class Cart extends Base {
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
}
