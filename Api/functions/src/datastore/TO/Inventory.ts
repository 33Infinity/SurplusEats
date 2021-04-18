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
    public static Categories = "Categories";
  };
  Name: string;
  Description: string;
  Price: number;
  Quantity: number;
  ImageUrl: string;
  LocationId: string;
  Categories: number[];
  private constructor(
    aName,
    aDescription,
    aPrice,
    aQuantity,
    anImageUrl,
    aLocationId,
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
    this.LocationId = aLocationId;
    this.Categories = someCategories;
  }
  public static NewInventory(
    aName,
    aDescription,
    aPrice,
    aQuantity,
    anImageUrl,
    aLocationId,
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
      aLocationId,
      someCategories,
      anId,
      aCreatedDate
    );
  }
  getTuple() {
    return {
      Name: this.Name,
      Description: this.Description,
      Price: this.Price,
      Quantity: this.Quantity,
      ImageUrl: this.ImageUrl,
      LocationId: this.LocationId,
      Categories: this.Categories,
      CreatedDate: this.CreatedDate,
    };
  }
}
