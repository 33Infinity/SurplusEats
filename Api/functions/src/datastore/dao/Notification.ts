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

  static async add(admin, aNotificationTO: NotificationTO) {
    const response = await SqlHelper.insert(
      admin,
      NotificationTO.TableName,
      aNotificationTO.getTuple()
    );
    return response;
  }

  static async update(admin, anId, notification) {
    const response = await SqlHelper.update(
      admin,
      NotificationTO.TableName,
      notification,
      anId
    );
    return response;
  }

  static async delete(admin, aNotificationId) {
    const response = await SqlHelper.delete(
      admin,
      NotificationTO.TableName,
      aNotificationId
    );
    return response;
  }
}
