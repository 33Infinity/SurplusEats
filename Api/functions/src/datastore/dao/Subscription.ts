import SubscriptionTO from "../to/Subscription";
import SqlHelper from "../../utils/SqlHelper";
import Clause from "../Clause";
import Operators from "../Operators";

export default class Subscription {
  static async add(admin, aSubscriptionTO: SubscriptionTO) {
    const response = await SqlHelper.insert(
      admin,
      SubscriptionTO.TableName,
      aSubscriptionTO.getTuple()
    );
    return response;
  }

  static async delete(admin, anId) {
    const response = await SqlHelper.delete(
      admin,
      SubscriptionTO.TableName,
      anId
    );
    return response;
  }

  static async getByEmail(admin, anEmail) {
    const clauses: Clause[] = [];
    clauses.push(
      Clause.NewClause(
        SubscriptionTO.ColumnNames.Email,
        Operators.equals,
        anEmail.toLowerCase()
      )
    );
    const response = await SqlHelper.getWithClauses(
      admin,
      SubscriptionTO.TableName,
      clauses
    );
    if (response == null || response.length === 0) {
      return response;
    }
    return response;
  }
}
