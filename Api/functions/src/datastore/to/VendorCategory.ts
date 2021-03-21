import BaseTable from "./BaseTable";

export default class VendorCategory extends BaseTable {
  public static TableName = "vendorCategory";
  static ColumnNames = class {
    public static VendorCategoryId = "VendorCategoryId";
    public static Name = "Name";
  };
  VendorCategoryId: number;
  Name: string;
  private constructor(aVendorCategoryId, aName, anId) {
    super(anId, null);
    this.VendorCategoryId = aVendorCategoryId;
    this.Name = aName;
  }
  public static NewVendorCategory(
    aVendorCategoryId,
    aName,
    anId
  ): VendorCategory {
    return new VendorCategory(aVendorCategoryId, aName, anId);
  }
  getTuple() {
    return {
      VendorCategory: this.VendorCategoryId,
      Name: this.Name,
    };
  }
}
