import VendorModel from "../models/Vendor";
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
    return this.buildVendorModel(json[0]);
  }

  static buildVendorModel(someJson) {
    return VendorModel.NewVendor(
      someJson.UserEmail,
      someJson.Name,
      someJson.ImageUrl,
      someJson.Description,
      someJson.Id,
      someJson.CreatedDate
    );
  }
}
