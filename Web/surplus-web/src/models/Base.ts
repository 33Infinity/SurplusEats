export default class Base {
  Id: string;
  CreatedDate: Date;

  protected constructor(anId, aCreatedDate) {
    this.Id = anId != null ? anId : Base.newGuid();
    this.CreatedDate = aCreatedDate != null ? aCreatedDate : new Date();
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
