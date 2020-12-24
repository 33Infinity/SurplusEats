import Clause from "../datastore/Clause";

export default class SqlHelper {
  static get(anAdmin, aTableName) {
    const query = anAdmin.firestore().collection(aTableName);
    return query;
  }

  static getWithClauses(anAdmin, aTableName, someClauses: Clause[]) {
    let query = anAdmin.firestore().collection(aTableName);
    someClauses.forEach((clause: Clause) => {
      query = query.where(clause.ColumnName, clause.Operator, clause.Value);
    });
    return query;
  }

  static buildInFromArray(anArray) {
    let ret = "";
    for (let i = 0; i < anArray.length; i++) {
      ret += i === anArray.length - 1 ? anArray[i] : anArray[i] + ",";
    }
    return ret;
  }
}
