import ProfileModel from "../models/Profile";
import AuthenticationRequest from "../requests/Authentication";
import Error from "../models/Error";

export default class Authentication {
  async register(aProfileModel, aVendorModel): Promise<ProfileModel | Error> {
    const request = new AuthenticationRequest();
    const json = await request.register(aProfileModel, aVendorModel);
    if (json.ErrorMessage != null) {
      return Error.NewError(json.ErrorMessage);
    }
    return this.buildProfileModel(json);
  }

  async signIn(anEmail, aPassword): Promise<ProfileModel | Error> {
    const request = new AuthenticationRequest();
    const json = await request.signIn(anEmail, aPassword);
    if (json.ErrorMessage != null) {
      return Error.NewError(json.ErrorMessage);
    }
    return this.buildProfileModel(json);
  }

  async getProfile(anEmail): Promise<ProfileModel | Error> {
    const request = new AuthenticationRequest();
    const json = await request.getProfile(anEmail);
    if (json.ErrorMessage != null) {
      return Error.NewError(json.ErrorMessage);
    }
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
