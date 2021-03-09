import VendorModel from "../models/Vendor";
import VendorCategoryModel from "../models/VendorCategory";
import ErrorModel from "../models/Error";
import VendorRequest from "../requests/Vendor";
import BaseService from "./BaseService";

export default class Vendor extends BaseService {
  static async getByEmail(anEmail): Promise<VendorModel | ErrorModel> {
    const json = await VendorRequest.getByEmail(anEmail);
    if (this.isApiError(json)) {
      return ErrorModel.NewError(json.ErrorMessage);
    }
    return this.buildVendorModel(json[0]);
  }

  static async update(aVendorModel): Promise<VendorModel | ErrorModel> {
    const json = await VendorRequest.update(aVendorModel);
    if (this.isApiError(json)) {
      return ErrorModel.NewError(json.ErrorMessage);
    }
    return this.buildVendorModel(json);
  }

  static buildVendorModel(someJson) {
    const vendorCategories: VendorCategoryModel[] = [];
    for (let i = 0; i < someJson.Vendor?.Categories.length; i++) {
      vendorCategories.push(
        VendorCategoryModel.NewVendorCategory(
          someJson.Vendor?.Categories[i].Name,
          someJson.Vendor?.Categories[i].Id,
          someJson.Vendor?.Categories[i].CreatedDate
        )
      );
    }
    return VendorModel.NewVendor(
      someJson.UserEmail,
      someJson.Name,
      someJson.ImageUrl,
      someJson.Description,
      vendorCategories,
      someJson.Id,
      someJson.CreatedDate
    );
  }
}
