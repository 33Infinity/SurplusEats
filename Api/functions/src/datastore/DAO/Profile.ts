import Clause from "../Clause";
import Operators from "../Operators";
import SqlHelper from "../../utils/SqlHelper";
import ProfileTO from "../to/Profile";
import Encryption from "../../utils/Encryption";
import SubscriptionDAO from "../dao/Subscription";

export default class Profile {
  static async getByEmail(admin, anEmail) {
    const clauses: Clause[] = [];
    clauses.push(
      Clause.NewClause(
        ProfileTO.ColumnNames.Email,
        Operators.equals,
        anEmail.toLowerCase()
      )
    );
    const response = await SqlHelper.getWithClauses(
      admin,
      ProfileTO.TableName,
      clauses
    );
    if (response == null || response.length === 0) {
      return response;
    }
    const tuple = Profile.buildTuple(admin, response[0], true);
    return tuple;
  }

  static async getByUserNamePassword(admin, anEmail, aPassword) {
    const clauses: Clause[] = [];
    clauses.push(
      Clause.NewClause(
        ProfileTO.ColumnNames.Email,
        Operators.equals,
        anEmail.toLowerCase()
      )
    );
    clauses.push(
      Clause.NewClause(
        ProfileTO.ColumnNames.Password,
        Operators.equals,
        aPassword
      )
    );
    const response = await SqlHelper.getWithClauses(
      admin,
      ProfileTO.TableName,
      clauses
    );
    if (response == null || response.length === 0) {
      return response;
    }
    const tuple = Profile.buildTuple(admin, response[0], true);
    return tuple;
  }

  static async add(admin, profile) {
    const tuple = Profile.buildTuple(admin, profile, true);
    tuple.Password = Encryption.encrypt(profile.Password);
    await SqlHelper.insert(admin, ProfileTO.TableName, tuple);
    return tuple;
  }

  private static buildTuple(admin, aProfile, isAuthenticated) {
    const profileTO = ProfileTO.NewProfile(
      aProfile.Email.toLowerCase(),
      null,
      aProfile.FirstName,
      aProfile.LastName,
      aProfile.IsVendor,
      isAuthenticated,
      aProfile.Id,
      aProfile.CreatedDate
    );
    const profile = profileTO.getTuple();
    profile["InventoryIds"] = this.getSubscribedInventoryIdsFromEmail(
      admin,
      aProfile.Email.toLowerCase()
    );
    return profile;
  }

  static async getSubscribedInventoryIdsFromEmail(admin, anEmail) {
    const inventory = await SubscriptionDAO.getByEmail(admin, anEmail);
    return inventory?.map((eachItem) => {
      return eachItem["InventoryId"];
    });
  }
}
