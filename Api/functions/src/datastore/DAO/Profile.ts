import Clause from "../Clause";
import Operators from "../Operators";
import SqlHelper from "../../utils/SqlHelper";
import ProfileTO from "../TO/Profile";

export default class Profile {
  static async getByEmail(admin, anEmail) {
    const clauses: Clause[] = [];
    clauses.push(
      Clause.NewClause(ProfileTO.ColumnNames.Email, Operators.equals, anEmail)
    );
    const response = await SqlHelper.getWithClauses(
      admin,
      ProfileTO.TableName,
      clauses
    );
    return response;
  }

  static async add(admin, profile) {
    const profileTO = ProfileTO.NewProfile(
      profile.Email,
      profile.Password,
      profile.FirstName,
      profile.LastName,
      profile.IsVendor,
      true,
      null,
      new Date()
    );
    const tuple = profileTO.getTuple();
    await SqlHelper.insert(admin, ProfileTO.TableName, tuple);
    return tuple;
  }
}
