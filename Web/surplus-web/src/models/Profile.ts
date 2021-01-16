import BaseModel from "./Base";

export default class Profile extends BaseModel {
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
    aVendor,
    isAuthenticated,
    anId,
    aCreatedDate
  ) {
    super(anId, aCreatedDate);
    this.Email = anEmail;
    this.Password = aPassword;
    this.FirstName = aFirstName;
    this.LastName = aLastName;
    this.IsVendor = aVendor;
    this.IsAuthenticated = isAuthenticated;
  }
  public static NewProfile(
    anEmail,
    aPassword,
    aFirstName,
    aLastName,
    isVendor,
    anId,
    aCreatedDate,
    isAuthenticated
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
  public static EmptyProfile(): Profile {
    return new Profile("", "", "", "", "", false, "", null);
  }
}
