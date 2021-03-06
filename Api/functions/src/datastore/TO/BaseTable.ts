export default abstract class BaseTable {
  Id: string;
  CreatedDate: Date;

  public static PrimaryKeyColumnName = "Id";
  public static CreatedDateColumnName = "CreatedDate";

  constructor(anId, aCreatedDate) {
    this.Id = anId;
    this.CreatedDate = aCreatedDate != null ? aCreatedDate : new Date();
  }
  abstract getTuple();
}
