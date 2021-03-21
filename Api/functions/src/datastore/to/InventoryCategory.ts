import BaseTable from "./BaseTable";

export default class InventoryCategory extends BaseTable {
  public static TableName = "inventoryCategory";
  static ColumnNames = class {
    public static InventoryCategoryId = "InventoryCategoryId";
    public static Name = "Name";
  };
  InventoryCategoryId: number;
  Name: string;
  private constructor(aInventoryCategoryId, aName, anId) {
    super(anId, null);
    this.InventoryCategoryId = aInventoryCategoryId;
    this.Name = aName;
  }
  public static NewInventoryCategory(
    aInventoryCategoryId,
    aName,
    anId
  ): InventoryCategory {
    return new InventoryCategory(aInventoryCategoryId, aName, anId);
  }
  getTuple() {
    return {
      InventoryCategory: this.InventoryCategoryId,
      Name: this.Name,
    };
  }
}
