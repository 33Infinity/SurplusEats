import SqlHelper from "../../utils/SqlHelper";
import VendorCategoryTO from "../to/VendorCategory";

export default class VendorCategory {
  static async getByNames(anAdmin, someNames: string[]) {
    const response = await SqlHelper.getByArray(
      anAdmin,
      VendorCategoryTO.TableName,
      VendorCategoryTO.ColumnNames.Name,
      someNames
    );
    return response;
  }
}
