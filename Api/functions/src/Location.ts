"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const location_functions = require("firebase-functions");
const location_admin = require("firebase-admin");
const location_cors = require("cors")({
  origin: true,
});
import LocationDAO from "./datastore/dao/Location";
import HttpHelper from "./utils/HttpHelper";
import LocationTO from "./datastore/to/Location";
import LocationBO from "./bo/Location";

exports.getByVendor = location_functions.https.onRequest(
  async (request: any, response: any) => {
    return location_cors(request, response, async () => {
      const data = JSON.parse(request.body);
      const locations = LocationBO.getByVendor(location_admin, data.Email);
      response.send(HttpHelper.buildResponse(locations));
    });
  }
);

exports.getByLatLon = location_functions.https.onRequest(
  async (request: any, response: any) => {
    return location_cors(request, response, async () => {
      const data = JSON.parse(request.body);
      const locations = LocationBO.getByLatLon(
        location_admin,
        data.Latitude,
        data.Longitude
      );
      response.send(HttpHelper.buildResponse(locations));
    });
  }
);

exports.add = location_functions.https.onRequest(
  async (request: any, response: any) => {
    return location_cors(request, response, async () => {
      const data = JSON.parse(request.body);
      const resp = await LocationBO.add(
        location_admin,
        data.VendorModel.Id,
        data.Name,
        data.City,
        data.State,
        data.Latitude,
        data.Longitude,
        data.Address,
        data.PostalCode
      );
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
