import BaseModel from "./Base";

export default class Vendor extends BaseModel {
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
  public static NewBlankVendor(): Vendor {
    return new Vendor("", "", "", "", "");
  }

  public static NewVendorFromJson(someJson) {
    return this.NewVendor(
      someJson.Name,
      someJson.ImageUrl,
      someJson.Description,
      someJson.Id,
      someJson.CreatedDate
    );
  }
}
