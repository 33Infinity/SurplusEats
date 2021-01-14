import BaseTable from "./BaseTable";

export default class Vendor extends BaseTable {
  public static TableName = "vendor";
  static ColumnNames = class {
    public static UserEmail = "UserEmail";
    public static Name = "Name";
    public static ImageUrl = "ImageUrl";
    public static Description = "Description";
  };
  UserEmail: string;
  Name: string;
  ImageUrl: string;
  Description: string;
  private constructor(
    aUserEmail,
    aName,
    anImageUrl,
    aDescription,
    anId,
    aCreatedDate
  ) {
    super(anId, aCreatedDate);
    this.UserEmail = aUserEmail;
    this.Name = aName;
    this.ImageUrl = anImageUrl;
    this.Description = aDescription;
  }
  public static NewVendor(
    aUserEmail,
    aName,
    anImageUrl,
    aDescription,
    anId,
    aCreatedDate
  ): Vendor {
    return new Vendor(
      aUserEmail,
      aName,
      anImageUrl,
      aDescription,
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
      CreatedDate: this.CreatedDate,
    };
  }
}
