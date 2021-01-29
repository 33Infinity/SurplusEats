import VendorModel from "../models/Vendor";
import ErrorModel from "../models/Error";
import VendorRequest from "../requests/Vendor";

export default class Vendor {
  async getByEmail(anEmail): Promise<VendorModel | ErrorModel> {
    const request = new VendorRequest();
    const json = await request.getByEmail(anEmail);
    return json != null && json.length > 0
      ? this.buildVendorModel(json[0])
      : ErrorModel.NewError(json.ErrorMessage);
  }

  async update(aVendorModel): Promise<VendorModel | ErrorModel> {
    const request = new VendorRequest();
    const json = await request.update(aVendorModel);
    return json != null && json.length > 0
      ? this.buildVendorModel(json[0])
      : ErrorModel.NewError(json.ErrorMessage);
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
