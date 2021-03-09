import BaseModel from "./Base";
import VendorCategory from "./VendorCategory";

export default class Vendor extends BaseModel {
  UserEmail: string;
  Name: string;
  ImageUrl: string;
  Description: string;
  Categories: VendorCategory[];
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
  public static NewBlankVendor(): Vendor {
    return new Vendor("", "", "", "", [], "", "");
  }
}
