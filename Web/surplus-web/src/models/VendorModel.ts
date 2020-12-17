import BaseModel from "./BaseModel";

export default class VendorModel extends BaseModel {
  Name: string;
  ImageUrl: string;
  Description: string;
  constructor(aName, anImageUrl, aDescription) {
    super();
    this.Name = aName;
    this.ImageUrl = anImageUrl;
    this.Description = aDescription;
  }
  public static NewVendor(aName, anImageUrl, aDescription): VendorModel {
    return new VendorModel(aName, anImageUrl, aDescription);
  }
}
