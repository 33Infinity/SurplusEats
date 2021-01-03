import BaseModel from "./Base";

export default class Profile extends BaseModel {
  UserName: string;
  Email: string;
  Password: string;
  FirstName: string;
  LastName: string;
  Vendor: Boolean;
  Authenticated: Boolean;
  private constructor(
    aUserName,
    anEmail,
    aPassword,
    aFirstName,
    aLastName,
    aVendor,
    isAuthenticated,
    anId,
    aCreatedDate
  ) {
    super(anId, aCreatedDate);
    this.UserName = aUserName;
    this.Email = anEmail;
    this.Password = aPassword;
    this.FirstName = aFirstName;
    this.LastName = aLastName;
    this.Vendor = aVendor;
    this.Authenticated = isAuthenticated;
  }
  public static NewNonVendor(
    aUserName,
    anEmail,
    aPassword,
    aFirstName,
    aLastName,
    anId,
    aCreatedDate
  ): Profile {
    return new Profile(
      aUserName,
      anEmail,
      aPassword,
      aFirstName,
      aLastName,
      null,
      false,
      anId,
      aCreatedDate
    );
  }
}
