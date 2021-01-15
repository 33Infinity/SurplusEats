import Clause from "../datastore/Clause";

export default class SqlHelper {
  static async get(anAdmin, aTableName) {
    const query = anAdmin.firestore().collection(aTableName);
    const response = await query.get();
    return this.buildResponse(response);
  }

  static async getById(anAdmin, aTableName, anId) {
    const response = await anAdmin
      .firestore()
      .collection(aTableName)
      .where("__name__", "=", anId)
      .get();
    return this.buildResponse(response);
  }

  static async getByIds(anAdmin, aTableName, someIds) {
    const response = await anAdmin
      .firestore()
      .collection(aTableName)
      .where("__name__", "in", someIds)
      .get();
    return this.buildResponse(response);
  }

  static async getWithClauses(anAdmin, aTableName, someClauses: Clause[]) {
    let query = anAdmin.firestore().collection(aTableName);
    someClauses.forEach((clause: Clause) => {
      query = query.where(clause.ColumnName, clause.Operator, clause.Value);
    });
    const response = await query.get();
    return this.buildResponse(response);
  }

  static async insert(anAdmin, aTableName, aTuple) {
    const response = await anAdmin
      .firestore()
      .collection(aTableName)
      .doc()
      .set(aTuple);
    return !response.HasError;
  }

  static async update(anAdmin, aTableName, aTuple, anId) {
    const response = await anAdmin
      .firestore()
      .collection(aTableName)
      .doc(anId)
      .update(aTuple);
    return !response.HasError;
  }

  static async delete(anAdmin, aTableName, anId) {
    const response = await anAdmin
      .firestore()
      .collection(aTableName)
      .doc(anId)
      .delete();
    return !response.HasError;
  }

  static buildResponse(response) {
    if (response.docs.length === 0) return null;
    return response.docs.map((doc) => {
      let ret = doc.data();
      ret.Id = doc.id;
      return ret;
    });
  }
}
