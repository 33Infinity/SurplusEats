import BaseTable from "./BaseTable";

export default class Inventory extends BaseTable {
  public static TableName = "inventory";

  public static Description = "Description";
  public static Price = "Price";
  public static Quantity = "Quantity";
  public static ImageUrl = "ImageUrl";
  public static LocationId = "LocationId";
}
