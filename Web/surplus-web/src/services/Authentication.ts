import ProfileModel from "../models/Profile";
import VendorModel from "../models/Vendor";
import AuthenticationRequest from "../requests/Authentication";

export default class Authentication {
  async register(aProfileModel, aVendorModel): Promise<ProfileModel> {
    const request = new AuthenticationRequest();
    const json = await request.register(aProfileModel, aVendorModel);
    return this.buildProfileModel(json);
  }

  buildProfileModel(someJson) {
    return ProfileModel.NewProfile(
      someJson.Email,
      someJson.Password,
      someJson.FirstName,
      someJson.LastName,
      someJson.IsVendor,
      someJson.Id,
      someJson.CreatedDate,
      someJson.IsAuthenticated
    );
  }
}
