"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const location_functions = require("firebase-functions");
const location_admin = require("firebase-admin");
const location_cors = require("cors")({
  origin: true,
});
import LocationDAO from "./datastore/dao/Location";
import HttpHelper from "./utils/HttpHelper";
import SqlHelper from "./utils/SqlHelper";
import IResponse from "./IResponse";
import GeoLocationHelper from "./utils/GeoLocationHelper";
import LocationTO from "./datastore/to/Location";
import VendorDAO from "./datastore/dao/Vendor";
import Error from "./Error";
import Constants from "./Constants";

exports.getByVendor = location_functions.https.onRequest(
  async (request: any, response: any) => {
    return location_cors(request, response, async () => {
      let retObj: IResponse = {};
      const data = JSON.parse(request.body);
      const email = data.Email;
      const vendor = await VendorDAO.getByEmail(location_admin, email);
      if (vendor == null || vendor.length == 0) {
        const error = Error.NewError(
          Constants.Error.VENDOR_DOES_NOT_EXIST,
          "500"
        );
        response.status(500).send(error);
        return;
      }
      const locations = await LocationDAO.getLocationsByVendor(
        location_admin,
        vendor[0].Id
      );
      retObj.Locations = locations;
      retObj.Vendors = vendor;
      retObj = LocationDAO.Normalize(retObj);
      response.send(HttpHelper.buildResponse(retObj));
    });
  }
);

exports.getByLatLon = location_functions.https.onRequest(
  async (request: any, response: any) => {
    return location_cors(request, response, async () => {
      let retObj: IResponse = {};
      const data = JSON.parse(request.body);
      const latitude = data.Latitude;
      const longitude = data.Longitude;
      let locations = await SqlHelper.get(location_admin, LocationTO.TableName);
      const closestLocations = GeoLocationHelper.GetClosestNLocations(
        latitude,
        longitude,
        locations,
        10
      );
      retObj.Locations = closestLocations;
      retObj.Vendors = await VendorDAO.getVendorByLocations(
        location_admin,
        closestLocations
      );
      retObj = LocationDAO.Normalize(retObj);
      response.send(HttpHelper.buildResponse(retObj));
    });
  }
);

exports.add = location_functions.https.onRequest(
  async (request: any, response: any) => {
    return location_cors(request, response, async () => {
      const data = JSON.parse(request.body);
      const resp = await LocationDAO.add(location_admin, data);
      response.send(resp);
    });
  }
);

exports.update = location_functions.https.onRequest(
  async (request: any, response: any) => {
    return location_cors(request, response, async () => {
      const data = JSON.parse(request.body);
      const locationTO = LocationTO.NewLocation(
        data.VendorModel.Id,
        data.Name,
        data.City,
        data.State,
        data.Latitude,
        data.Longitude,
        data.Address,
        data.PostalCode,
        data.Id,
        data.CreatedDate
      );
      const resp = await LocationDAO.update(
        location_admin,
        data.Id,
        locationTO.getTuple()
      );
      response.send(resp);
    });
  }
);

exports.delete = location_functions.https.onRequest(
  async (request: any, response: any) => {
    return location_cors(request, response, async () => {
      const data = JSON.parse(request.body);
      const locationId = data.LocationId;
      const resp = await LocationDAO.delete(location_admin, locationId);
      response.send(resp);
    });
  }
);
