import Clause from "../Clause";
import Operators from "../Operators";
import SqlHelper from "../../utils/SqlHelper";
import NotificationTO from "../to/Notification";

export default class Notification {
  static async add(admin, aNotificationTO: NotificationTO) {
    const response = await SqlHelper.insert(
      admin,
      NotificationTO.TableName,
      aNotificationTO.getTuple()
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

  static async markAllAsRead(admin, anEmail) {
    try {
      let notifications = await this.getByEmail(admin, anEmail);
      await notifications.forEach(async (notification) => {
        notification[NotificationTO.ColumnNames.MarkedAsRead] = true;
        await SqlHelper.update(
          admin,
          NotificationTO.TableName,
          notification,
          notification[NotificationTO.PrimaryKeyColumnName]
        );
      });
    } catch {
      return false;
    }
    return true;
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
}
