import BaseModel from "./BaseModel";
import LocationModel from "./LocationModel";

export default class InventoryModel extends BaseModel {
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
  ): InventoryModel {
    return new InventoryModel(
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
