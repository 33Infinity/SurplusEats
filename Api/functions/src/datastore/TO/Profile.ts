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
    public static CreditCardNumber = "CreditCardNumber";
    public static CreditCardMonth = "CreditCardMonth";
    public static CreditCardYear = "CreditCardYear";
    public static CreditCardName = "CreditCardName";
  };
  Email: string;
  Password: string;
  FirstName: string;
  LastName: string;
  IsVendor: Boolean;
  IsAuthenticated: Boolean;
  CreditCardNumber: string;
  CreditCardMonth: string;
  CreditCardYear: string;
  CreditCardName: string;
  private constructor(
    anEmail,
    aPassword,
    aFirstName,
    aLastName,
    isVendor,
    isAuthenticated,
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
    this.IsVendor = isVendor;
    this.IsAuthenticated = isAuthenticated;
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
    isAuthenticated,
    aCreditCardNumber,
    aCreditCardMonth,
    aCreditCardYear,
    aCreditCardName,
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
      aCreditCardNumber,
      aCreditCardMonth,
      aCreditCardYear,
      aCreditCardName,
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
      CreditCardNumber: this.CreditCardNumber,
      CreditCardMonth: this.CreditCardMonth,
      CreditCardYear: this.CreditCardYear,
      CreditCardName: this.CreditCardName,
      CreatedDate: this.CreatedDate,
    };
  }
}
