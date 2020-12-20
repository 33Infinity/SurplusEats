import Clause from "../datastore/Clause";

export default class SqlHelper {
  static async get(anAdmin, aTableName) {
    const query = anAdmin.firestore().collection(aTableName);
    return query;
  }

  static getWithClauses(anAdmin, aTableName, someClauses: Clause[]) {
    let query = anAdmin.firestore().collection(aTableName);
    someClauses.forEach((clause: Clause) => {
      query = query.where(SqlHelper.getClause(clause));
    });
    return query;
  }

  private static getClause(aClause: Clause) {
    return `${aClause.ColumnName},${aClause.Operator},${aClause.Value}`;
  }
}
