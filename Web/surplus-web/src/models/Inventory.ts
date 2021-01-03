import BaseModel from "./Base";
import LocationModel from "./Location";

export default class Inventory extends BaseModel {
  Description: string;
  Price: number;
  Quantity: number;
  ImageUrl: string;
  LocationModel: LocationModel;
  private constructor(
    aDescription,
    aPrice,
    aQuantity,
    anImageUrl,
    aLocationModel,
    anId,
    aCreatedDate
  ) {
    super(anId, aCreatedDate);
    this.Description = aDescription;
    this.Price = aPrice;
    this.Quantity = aQuantity;
    this.ImageUrl = anImageUrl;
    this.LocationModel = aLocationModel;
  }
  public static NewInventory(
    aDescription,
    aPrice,
    aQuantity,
    anImageUrl,
    aLocationModel,
    anId,
    aCreatedDate
  ): Inventory {
    return new Inventory(
      aDescription,
      aPrice,
      aQuantity,
      anImageUrl,
      aLocationModel,
      anId,
      aCreatedDate
    );
  }
}
