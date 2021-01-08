"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const location_functions = require("firebase-functions");
const location_admin = require("firebase-admin");
const location_cors = require("cors")({
  origin: true,
});
import LocationDAO from "./datastore/DAO/Location";
import HttpHelper from "./utils/HttpHelper";
import SqlHelper from "./utils/SqlHelper";
import IResponse from "./IResponse";
import VendorTO from "./datastore/TO/Vendor";
import GeoLocationHelper from "./utils/GeoLocationHelper";
import LocationTO from "./datastore/TO/Location";
import VendorDAO from "./datastore/DAO/Vendor";

exports.getByVendor = location_functions.https.onRequest(
  async (request: any, response: any) => {
    return location_cors(request, response, async () => {
      let retObj: IResponse = {};
      const data = JSON.parse(request.body);
      const vendorId = data.VendorId;
      const vendor = await SqlHelper.getById(
        location_admin,
        VendorTO.TableName,
        vendorId
      );
      const locations = await LocationDAO.getLocationsByVendor(
        location_admin,
        vendorId
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

exports.addLocation = location_functions.https.onRequest(
  async (request: any, response: any) => {
    return location_cors(request, response, async () => {
      const data = JSON.parse(request.body);
      const resp = LocationDAO.addLocation(location_admin, data);
      response.send(resp);
    });
  }
);
