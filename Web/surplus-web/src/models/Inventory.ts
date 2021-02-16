import BaseModel from "./Base";
import LocationModel from "./Location";

export default class Inventory extends BaseModel {
  Name: string;
  Description: string;
  Price: number;
  Quantity: number;
  ImageUrl: string;
  LocationModel: LocationModel;
  private constructor(
    aName,
    aDescription,
    aPrice,
    aQuantity,
    anImageUrl,
    aLocationModel,
    anId,
    aCreatedDate
  ) {
    super(anId, aCreatedDate);
    this.Name = aName;
    this.Description = aDescription;
    this.Price = aPrice;
    this.Quantity = aQuantity;
    this.ImageUrl = anImageUrl;
    this.LocationModel = aLocationModel;
  }
  public static NewInventory(
    aName,
    aDescription,
    aPrice,
    aQuantity,
    anImageUrl,
    aLocationModel,
    anId,
    aCreatedDate
  ): Inventory {
    return new Inventory(
      aName,
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
