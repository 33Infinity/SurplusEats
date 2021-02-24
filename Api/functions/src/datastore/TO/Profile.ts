import BaseTable from "./BaseTable";

export default class Profile extends BaseTable {
  public static TableName = "profile";
  static ColumnNames = class {
    public static Email = "Email";
    public static Password = "Password";
    public static FirstName = "FirstName";
    public static LastName = "LastName";
    public static IsVendor = "IsVendor";
    public static IsAuthenticated = "IsAuthenticated";
  };
  Email: string;
  Password: string;
  FirstName: string;
  LastName: string;
  IsVendor: Boolean;
  IsAuthenticated: Boolean;
  private constructor(
    anEmail,
    aPassword,
    aFirstName,
    aLastName,
    isVendor,
    isAuthenticated,
    anId,
    aCreatedDate
  ) {
    super(anId, aCreatedDate);
    this.Email = anEmail;
    this.Password = aPassword;
    this.FirstName = aFirstName;
    this.LastName = aLastName;
    this.IsVendor = isVendor;
    this.IsAuthenticated = isAuthenticated;
  }
  public static NewProfile(
    anEmail,
    aPassword,
    aFirstName,
    aLastName,
    isVendor,
    isAuthenticated,

    anId,
    aCreatedDate
  ): Profile {
    return new Profile(
      anEmail,
      aPassword,
      aFirstName,
      aLastName,
      isVendor,
      isAuthenticated,
      anId,
      aCreatedDate
    );
  }
  getTuple() {
    return {
      Email: this.Email,
      Password: this.Password,
      FirstName: this.FirstName,
      LastName: this.LastName,
      IsVendor: this.IsVendor,
      IsAuthenticated: this.IsAuthenticated,
      CreatedDate: this.CreatedDate,
    };
  }
}
