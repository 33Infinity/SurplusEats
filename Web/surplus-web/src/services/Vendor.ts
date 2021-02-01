import VendorModel from "../models/Vendor";
import ErrorModel from "../models/Error";
import VendorRequest from "../requests/Vendor";
import BaseService from "./BaseService";

export default class Vendor extends BaseService {
  async getByEmail(anEmail): Promise<VendorModel | ErrorModel> {
    const request = new VendorRequest();
    const json = await request.getByEmail(anEmail);
    if (this.isApiError(json)) {
      return ErrorModel.NewError(json.ErrorMessage);
    }
    return this.buildVendorModel(json[0]);
  }

  async update(aVendorModel): Promise<VendorModel | ErrorModel> {
    const request = new VendorRequest();
    const json = await request.update(aVendorModel);
    if (this.isApiError(json)) {
      return ErrorModel.NewError(json.ErrorMessage);
    }
    return this.buildVendorModel(json[0]);
  }

  buildVendorModel(someJson) {
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
