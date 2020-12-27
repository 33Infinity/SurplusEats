import BaseModel from "./BaseModel";

export default class VendorModel extends BaseModel {
  Name: string;
  ImageUrl: string;
  Description: string;
  constructor(aName, anImageUrl, aDescription, anId, aCreatedDate) {
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
  ): VendorModel {
    return new VendorModel(aName, anImageUrl, aDescription, anId, aCreatedDate);
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
