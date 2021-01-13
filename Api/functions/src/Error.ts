export default class Error {
  ErrorMessage: string;
  Status: string;
  private constructor(aMessage, aStatus) {
    this.ErrorMessage = aMessage;
    this.Status = aStatus;
  }
  public static NewError(aMessage, aStatus) {
    return new Error(aMessage, aStatus);
  }
}
