import VendorDAO from "../datastore/dao/Vendor";
import Error from "../Error";
import Constants from "../Constants";
import IResponse from "../IResponse";
import LocationDAO from "../datastore/dao/Location";
import SqlHelper from "../utils/SqlHelper";
import GeoLocationHelper from "../utils/GeoLocationHelper";
import LocationTO from "../datastore/to/Location";

export default class Location {
  static async getByVendor(admin, anEmail) {
    let retObj: IResponse = {};
    const vendor = await VendorDAO.getByEmail(admin, anEmail);
    if (vendor == null || vendor.length == 0) {
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

  static async getByLatLon(admin, aLatitude, aLongitude) {
    let retObj: IResponse = {};
    let locations = await SqlHelper.get(admin, LocationTO.TableName);
    const closestLocations = GeoLocationHelper.GetClosestNLocations(
      aLatitude,
      aLongitude,
      locations,
      10
    );
    retObj.Locations = closestLocations;
    retObj.Vendors = await VendorDAO.getVendorByLocations(
      admin,
      closestLocations
    );
    retObj = LocationDAO.Normalize(retObj);
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
    aPostalCode
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
      anId,
      aCreatedDate
    );
    const resp = await LocationDAO.update(
      admin,
      aVendorId,
      locationTO.getTuple()
    );
    return resp;
  }

  static async delete(admin, aLocationId) {
    const resp = await LocationDAO.delete(admin, aLocationId);
    return resp;
  }
}
