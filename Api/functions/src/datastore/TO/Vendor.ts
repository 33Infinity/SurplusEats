import BaseTable from "./BaseTable";

export default class Vendor extends BaseTable {
  public static TableName = "vendor";
  static ColumnNames = class {
    public static UserEmail = "UserEmail";
    public static Name = "Name";
    public static ImageUrl = "ImageUrl";
    public static Description = "Description";
    public static Categories = "Categories";
  };
  UserEmail: string;
  Name: string;
  ImageUrl: string;
  Description: string;
  Categories: number[];
  private constructor(
    aUserEmail,
    aName,
    anImageUrl,
    aDescription,
    someCategories,
    anId,
    aCreatedDate
  ) {
    super(anId, aCreatedDate);
    this.UserEmail = aUserEmail;
    this.Name = aName;
    this.ImageUrl = anImageUrl;
    this.Description = aDescription;
    this.Categories = someCategories;
  }
  public static NewVendor(
    aUserEmail,
    aName,
    anImageUrl,
    aDescription,
    someCategories,
    anId,
    aCreatedDate
  ): Vendor {
    return new Vendor(
      aUserEmail,
      aName,
      anImageUrl,
      aDescription,
      someCategories,
      anId,
      aCreatedDate
    );
  }
  getTuple() {
    return {
      UserEmail: this.UserEmail,
      Name: this.Name,
      ImageUrl: this.ImageUrl,
      Description: this.Description,
      Categories: this.Categories,
      CreatedDate: this.CreatedDate,
    };
  }
}
