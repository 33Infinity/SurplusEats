import VendorDAO from "../datastore/dao/Vendor";
import Error from "../Error";
import Constants from "../Constants";
import IResponse from "../IResponse";
import LocationDAO from "../datastore/dao/Location";
import SqlHelper from "../utils/SqlHelper";
import GeoLocationHelper from "../utils/GeoLocationHelper";
import LocationTO from "../datastore/to/Location";

export default class Location {
  static async getById(admin, anId) {
    const location = await SqlHelper.getById(admin, LocationTO.TableName, anId);
    return location;
  }

  static async getByLatLon(admin, aLatitude, aLongitude) {
    let retObj: IResponse = {};
    const locations = await SqlHelper.get(admin, LocationTO.TableName);
    const closestLocations = GeoLocationHelper.GetClosestNLocations(
      aLatitude,
      aLongitude,
      locations,
      10
    );
    if (closestLocations == null) return null;
    retObj.Locations = closestLocations;
    retObj.Vendors = await VendorDAO.getVendorByLocations(
      admin,
      closestLocations
    );
    retObj = LocationDAO.Normalize(retObj);
    return retObj;
  }

  static async getByVendor(admin, anEmail) {
    const retObj: IResponse = {};
    const vendor = await VendorDAO.getByEmail(admin, anEmail);
    if (vendor == null || vendor.length === 0) {
      return Error.NewError(Constants.Error.VENDOR_DOES_NOT_EXIST, "500");
    }
    const locations = await LocationDAO.getLocationsByVendor(
      admin,
      vendor[0].Id
    );
    retObj.Locations = locations;
    retObj.Vendors = vendor;
    return LocationDAO.Normalize(retObj);
  }

  static async add(
    admin,
    aVendorId,
    aName,
    aCity,
    aState,
    aLatitude,
    aLongitude,
    aAddress,
    aPostalCode,
    aPhoneArea,
    aPhoneNumber
  ) {
    const locationTO = LocationTO.NewLocation(
      aVendorId,
      aName,
      aCity,
      aState,
      aLatitude,
      aLongitude,
      aAddress,
      aPostalCode,
      aPhoneArea,
      aPhoneNumber,
      null,
      new Date()
    );
    const response = await LocationDAO.add(admin, locationTO);
    return response;
  }

  static async update(
    admin,
    aVendorId,
    aName,
    aCity,
    aState,
    aLatitude,
    aLongitude,
    aAddress,
    aPostalCode,
    aPhoneArea,
    aPhoneNumber,
    anId,
    aCreatedDate
  ) {
    const locationTO = LocationTO.NewLocation(
      aVendorId,
      aName,
      aCity,
      aState,
      aLatitude,
      aLongitude,
      aAddress,
      aPostalCode,
      aPhoneArea,
      aPhoneNumber,
      anId,
      aCreatedDate
    );
    const resp = await LocationDAO.update(admin, anId, locationTO.getTuple());
    return resp;
  }

  static async delete(admin, aLocationId) {
    const resp = await LocationDAO.delete(admin, aLocationId);
    return resp;
  }
}
