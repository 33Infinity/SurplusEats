import BaseTable from "./BaseTable";

export default class Vendor extends BaseTable {
  public static TableName = "vendor";
  static ColumnNames = class {
    public static Name = "Name";
    public static ImageUrl = "ImageUrl";
    public static Description = "Description";
  };
  Name: string;
  ImageUrl: string;
  Description: string;
  private constructor(aName, anImageUrl, aDescription, anId, aCreatedDate) {
    super(anId, aCreatedDate);
    this.Name = aName;
    this.ImageUrl = anImageUrl;
    this.Description = aDescription;
  }
  public static NewVendor(
    aName,
    anImageUrl,
    aDescription,
    anId,
    aCreatedDate
  ): Vendor {
    return new Vendor(aName, anImageUrl, aDescription, anId, aCreatedDate);
  }
  getTuple() {}
}
