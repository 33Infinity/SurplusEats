import BaseModel from "./BaseModel";

export default class ProfileModel extends BaseModel {
  UserName: string;
  Email: string;
  Password: string;
  FirstName: string;
  LastName: string;
  Vendor: Boolean;
  Authenticated: Boolean;
  constructor(
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
  ): ProfileModel {
    return new ProfileModel(
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
