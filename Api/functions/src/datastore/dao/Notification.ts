import Clause from "../Clause";
import Operators from "../Operators";
import SqlHelper from "../../utils/SqlHelper";
import NotificationTO from "../to/Notification";

export default class Notification {
  static async getByEmail(admin, anEmail) {
    const clauses: Clause[] = [];
    clauses.push(
      Clause.NewClause(
        NotificationTO.ColumnNames.Email,
        Operators.equals,
        anEmail
      )
    );
    const response = await SqlHelper.getWithClauses(
      admin,
      NotificationTO.TableName,
      clauses
    );
    return response;
  }
}
