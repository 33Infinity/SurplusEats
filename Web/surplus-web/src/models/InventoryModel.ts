import BaseModel from "./BaseModel";
import LocationModel from "./LocationModel";

export default class InventoryModel extends BaseModel {
  Description: string;
  Price: number;
  Quantity: number;
  ImageUrl: string;
  LocationModel: LocationModel;
  constructor(aDescription, aPrice, aQuantity, anImageUrl, aLocationModel) {
    super();
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
    aLocationModel
  ): InventoryModel {
    return new InventoryModel(
      aDescription,
      aPrice,
      aQuantity,
      anImageUrl,
      aLocationModel
    );
  }
}
