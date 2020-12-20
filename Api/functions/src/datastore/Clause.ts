export default class Clause {
  ColumnName: string;
  Operator: string;
  Value: string;
  constructor(aColumnName, anOperator, aValue) {
    this.ColumnName = aColumnName;
    this.Operator = anOperator;
    this.Value = aValue;
  }
  public static NewClause(aColumnName, anOperator, aValue): Clause {
    return new Clause(aColumnName, anOperator, aValue);
  }
}
