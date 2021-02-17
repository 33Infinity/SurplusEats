import BaseTable from "./BaseTable";

export default class Location extends BaseTable {
  public static TableName = "location";

  static ColumnNames = class {
    public static VendorId = "VendorId";
    public static Name = "Name";
    public static City = "City";
    public static State = "State";
    public static Latitude = "Latitude";
    public static Longitude = "Longitude";
    public static Address = "Address";
    public static PostalCode = "PostalCode";
    public static PhoneArea = "PhoneArea";
    public static PhoneNumber = "PhoneNumber";
  };

  VendorId: string;
  Name: string;
  City: string;
  State: string;
  Latitude: number;
  Longitude: number;
  Address: string;
  PostalCode: string;
  PhoneArea: string;
  PhoneNumber: string;
  private constructor(
    aVendorId,
    aName,
    aCity,
    aState,
    aLatitude,
    aLongitude,
    anAddress,
    aPostalCode,
    aPhoneArea,
    aPhoneNumber,
    anId,
    aCreatedDate
  ) {
    super(anId, aCreatedDate);
    this.VendorId = aVendorId;
    this.Name = aName;
    this.City = aCity;
    this.State = aState;
    this.Latitude = aLatitude;
    this.Longitude = aLongitude;
    this.Address = anAddress;
    this.PostalCode = aPostalCode;
    this.PhoneArea = aPhoneArea;
    this.PhoneNumber = aPhoneNumber;
  }
  public static NewLocation(
    aVendorId,
    aName,
    aCity,
    aState,
    aLatitude,
    aLongitude,
    anAddress,
    aPostalCode,
    aPhoneArea,
    aPhoneNumber,
    anId,
    aCreatedDate
  ): Location {
    return new Location(
      aVendorId,
      aName,
      aCity,
      aState,
      aLatitude,
      aLongitude,
      anAddress,
      aPostalCode,
      aPhoneArea,
      aPhoneNumber,
      anId,
      aCreatedDate
    );
  }
  getTuple() {
    return {
      Name: this.Name,
      City: this.City,
      State: this.State,
      Latitude: this.Latitude,
      Longitude: this.Longitude,
      Address: this.Address,
      PostalCode: this.PostalCode,
      PhoneArea: this.PhoneArea,
      PhoneNumber: this.PhoneNumber,
      VendorId: this.VendorId,
      CreatedDate: this.CreatedDate,
    };
  }
}
