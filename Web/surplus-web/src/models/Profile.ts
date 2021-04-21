import BaseModel from "./Base";

export default class Profile extends BaseModel {
  Email: string;
  Password: string;
  FirstName: string;
  LastName: string;
  IsVendor: Boolean;
  IsAuthenticated: Boolean;
  InventoryIds: string[];
  CreditCardNumber: string;
  CreditCardMonth: string;
  CreditCardYear: string;
  CreditCardName: string;
  private constructor(
    anEmail,
    aPassword,
    aFirstName,
    aLastName,
    aVendor,
    isAuthenticated,
    someInventoryIds,
    aCreditCardNumber,
    aCreditCardMonth,
    aCreditCardYear,
    aCreditCardName,
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
    this.InventoryIds = someInventoryIds;
    this.CreditCardNumber = aCreditCardNumber;
    this.CreditCardMonth = aCreditCardMonth;
    this.CreditCardYear = aCreditCardYear;
    this.CreditCardName = aCreditCardName;
  }
  public static NewProfile(
    anEmail,
    aPassword,
    aFirstName,
    aLastName,
    isVendor,
    anId,
    aCreatedDate,
    isAuthenticated,
    someInventoryIds,
    aCreditCardNumber,
    aCreditCardMonth,
    aCreditCardYear,
    aCreditCardName
  ): Profile {
    return new Profile(
      anEmail,
      aPassword,
      aFirstName,
      aLastName,
      isVendor,
      isAuthenticated,
      someInventoryIds,
      aCreditCardNumber,
      aCreditCardMonth,
      aCreditCardYear,
      aCreditCardName,
      anId,
      aCreatedDate
    );
  }
  public static EmptyProfile(): Profile {
    return new Profile("", "", "", "", "", false, [], "", "", "", "", "", null);
  }
}
