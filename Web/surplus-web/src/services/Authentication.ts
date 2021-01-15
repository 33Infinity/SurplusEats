import ProfileModel from "../models/Profile";
import AuthenticationRequest from "../requests/Authentication";
import Error from "../models/Error";

export default class Authentication {
  async register(aProfileModel, aVendorModel): Promise<ProfileModel | Error> {
    const request = new AuthenticationRequest();
    const json = await request.register(aProfileModel, aVendorModel);
    return this.buildProfileModel(json);
  }

  async signIn(anEmail, aPassword): Promise<ProfileModel | Error> {
    const request = new AuthenticationRequest();
    const json = await request.signIn(anEmail, aPassword);
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
