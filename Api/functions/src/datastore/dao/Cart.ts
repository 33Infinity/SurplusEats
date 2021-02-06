import Clause from "../Clause";
import Operators from "../Operators";
import SqlHelper from "../../utils/SqlHelper";
import CartTO from "../to/Cart";

export default class Cart {
  static async getByEmail(admin, anEmail) {
    const clauses: Clause[] = [];
    clauses.push(
      Clause.NewClause(CartTO.ColumnNames.Email, Operators.equals, anEmail)
    );
    const response = await SqlHelper.getWithClauses(
      admin,
      CartTO.TableName,
      clauses
    );
    return response;
  }

  static async add(admin, aNotificationTO: CartTO) {
    const response = await SqlHelper.insert(
      admin,
      CartTO.TableName,
      aNotificationTO.getTuple()
    );
    return response;
  }

  static async update(admin, anId, cartItem) {
    const response = await SqlHelper.update(
      admin,
      CartTO.TableName,
      cartItem,
      anId
    );
    return response;
  }

  static async delete(admin, anId) {
    const response = await SqlHelper.delete(admin, CartTO.TableName, anId);
    return response;
  }
}
