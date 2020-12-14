export default class BaseModel {
  Id: string;
  CreatedDate: Date;

  constructor() {
    this.Id = BaseModel.newGuid();
    this.CreatedDate = new Date();
  }

  public static fillFromJSON(json: object) {
    for (var propName in json) {
      this[propName] = json[propName];
    }
  }

  private static newGuid(): string {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }
}
