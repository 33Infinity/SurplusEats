import BaseTable from "./BaseTable";

export default class Location extends BaseTable {
  public static TableName = "location";

  static ColumnNames = class {
    public static VendorId = "VendorId";
    public static Name = "Name";
    public static Latitude = "Latitude";
    public static Longitude = "Longitude";
    public static Address = "Address";
    public static PostalCode = "PostalCode";
  };

  VendorId: string;
  Name: string;
  Latitude: number;
  Longitude: number;
  Address: string;
  PostalCode: string;
  private constructor(
    aVendorId,
    aName,
    aLatitude,
    aLongitude,
    anAddress,
    aPostalCode,
    anId,
    aCreatedDate
  ) {
    super(anId, aCreatedDate);
    this.VendorId = aVendorId;
    this.Name = aName;
    this.Latitude = aLatitude;
    this.Longitude = aLongitude;
    this.Address = anAddress;
    this.PostalCode = aPostalCode;
  }
  public static NewLocation(
    aVendorModel,
    aName,
    aLatitude,
    aLongitude,
    anAddress,
    aPostalCode,
    anId,
    aCreatedDate
  ): Location {
    return new Location(
      aVendorModel,
      aName,
      aLatitude,
      aLongitude,
      anAddress,
      aPostalCode,
      anId,
      aCreatedDate
    );
  }
  getTuple() {}
}