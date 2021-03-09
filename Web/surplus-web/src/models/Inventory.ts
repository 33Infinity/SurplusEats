import BaseModel from "./Base";
import LocationModel from "./Location";
import InventoryCategory from "./InventoryCategory";

export default class Inventory extends BaseModel {
  Name: string;
  Description: string;
  Price: number;
  Quantity: number;
  ImageUrl: string;
  LocationModel: LocationModel;
  Categories: InventoryCategory[];
  private constructor(
    aName,
    aDescription,
    aPrice,
    aQuantity,
    anImageUrl,
    aLocationModel,
    someCategories,
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
    this.Categories = someCategories;
  }
  public static NewInventory(
    aName,
    aDescription,
    aPrice,
    aQuantity,
    anImageUrl,
    aLocationModel,
    someCategories,
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
      someCategories,
      anId,
      aCreatedDate
    );
  }
}
