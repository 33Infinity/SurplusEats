import Clause from "../Clause";
import Operators from "../Operators";
import SqlHelper from "../../utils/SqlHelper";
import InventoryTable from "../TO/Inventory";

export default class Inventory {
  static async getInventoryByLocations(admin, someLocations): Promise<any> {
    const locationArray: string[] = [];
    someLocations.forEach((location) => {
      locationArray.push(location.Id);
    });
    const clauses: Clause[] = [];
    clauses.push(
      Clause.NewClause(InventoryTable.LocationId, Operators.in, locationArray)
    );
    const response = await SqlHelper.getWithClauses(
      admin,
      InventoryTable.TableName,
      clauses
    );
    return response;
  }
}
