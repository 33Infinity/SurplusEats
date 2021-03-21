import SqlHelper from "../../utils/SqlHelper";
import InventoryCategoryTO from "../to/InventoryCategory";

export default class InventoryCategory {
  static async getByNames(anAdmin, someNames: string[]) {
    const response = await SqlHelper.getByArray(
      anAdmin,
      InventoryCategoryTO.TableName,
      InventoryCategoryTO.ColumnNames.Name,
      someNames
    );
    return response;
  }
}
