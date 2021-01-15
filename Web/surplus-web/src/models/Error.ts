export default class Error {
  private constructor(aMessage) {
    this.ErrorMessage = aMessage;
  }

  ErrorMessage: string;

  public static NewError(aMessage: string): Error {
    return new Error(aMessage);
  }
}
