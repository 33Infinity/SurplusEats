import BaseTable from "./BaseTable";

export default class Location extends BaseTable {
  public static TableName = "location";

  public static VendorId = "VendorId";
  public static Name = "Name";
  public static Latitude = "Latitude";
  public static Longitude = "Longitude";
  public static Address = "Address";
  public static PostalCode = "PostalCode";
}
