import BaseModel from "./BaseModel";

export default class InventoryModel extends BaseModel {
  Description: string;
  Price: number;
  Quantity: number;
  constructor(aDescription, aPrice, aQuantity) {
    super();
    this.Description = aDescription;
    this.Price = aPrice;
    this.Quantity = aQuantity;
  }
  public static NewInventory(aDescription, aPrice, aQuantity): InventoryModel {
    return new InventoryModel(aDescription, aPrice, aQuantity);
  }
}
