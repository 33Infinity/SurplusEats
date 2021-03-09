import Base from "./Base";

export default class VendorCategory extends Base {
  private constructor(aName, anId, aCreatedDate) {
    super(anId, aCreatedDate);
    this.Name = aName;
  }

  Name: string;

  public static NewVendorCategory(aName, anId, aCreatedDate): VendorCategory {
    return new VendorCategory(aName, anId, aCreatedDate);
  }
}
