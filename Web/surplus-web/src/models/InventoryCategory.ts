import Base from "./Base";

export default class InventoryCategory extends Base {
  private constructor(aName, anId, aCreatedDate) {
    super(anId, aCreatedDate);
    this.Name = aName;
  }

  Name: string;

  public static NewInventoryCategory(
    aName,
    anId,
    aCreatedDate
  ): InventoryCategory {
    return new InventoryCategory(aName, anId, aCreatedDate);
  }
}
