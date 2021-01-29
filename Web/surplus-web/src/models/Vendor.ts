import BaseModel from "./Base";

export default class Vendor extends BaseModel {
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
  public static NewBlankVendor(): Vendor {
    return new Vendor("", "", "", "", "", "");
  }
}
