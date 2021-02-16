import BaseTable from "./BaseTable";

export default class Inventory extends BaseTable {
  public static TableName = "inventory";
  static ColumnNames = class {
    public static Name = "Name";
    public static Description = "Description";
    public static Price = "Price";
    public static Quantity = "Quantity";
    public static ImageUrl = "ImageUrl";
    public static LocationId = "LocationId";
  };
  Name: string;
  Description: string;
  Price: number;
  Quantity: number;
  ImageUrl: string;
  LocationId: string;
  private constructor(
    aName,
    aDescription,
    aPrice,
    aQuantity,
    anImageUrl,
    aLocationId,
    anId,
    aCreatedDate
  ) {
    super(anId, aCreatedDate);
    (this.Name = aName), (this.Description = aDescription);
    this.Price = aPrice;
    this.Quantity = aQuantity;
    this.ImageUrl = anImageUrl;
    this.LocationId = aLocationId;
  }
  public static NewInventory(
    aName,
    aDescription,
    aPrice,
    aQuantity,
    anImageUrl,
    aLocationId,
    anId,
    aCreatedDate
  ): Inventory {
    return new Inventory(
      aName,
      aDescription,
      aPrice,
      aQuantity,
      anImageUrl,
      aLocationId,
      anId,
      aCreatedDate
    );
  }
  getTuple() {
    return {
      Name: this.Name,
      Description: this.Description,
      ImageUrl: this.ImageUrl,
      LocationId: this.LocationId,
      Price: this.Price,
      Quantity: this.Quantity,
      CreatedDate: this.CreatedDate,
    };
  }
}
