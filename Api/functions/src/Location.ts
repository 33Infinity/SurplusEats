"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const location_functions = require("firebase-functions");
const location_admin = require("firebase-admin");
const location_cors = require("cors")({
  origin: true,
});

import HttpHelper from "./utils/HttpHelper";
import LocationBO from "./bo/Location";

exports.getById = location_functions.https.onRequest(
  async (request: any, response: any) => {
    return location_cors(request, response, async () => {
      const data = JSON.parse(request.body);
      const location = await LocationBO.getById(location_admin, data.Id);
      response.send(HttpHelper.buildResponse(location));
    });
  }
);

exports.getByLatLon = location_functions.https.onRequest(
  async (request: any, response: any) => {
    return location_cors(request, response, async () => {
      const data = JSON.parse(request.body);
      const locations = await LocationBO.getByLatLon(
        location_admin,
        data.Latitude,
        data.Longitude
      );
      response.send(HttpHelper.buildResponse(locations));
    });
  }
);

exports.getByVendor = location_functions.https.onRequest(
  async (request: any, response: any) => {
    return location_cors(request, response, async () => {
      const data = JSON.parse(request.body);
      const locations = await LocationBO.getByVendor(
        location_admin,
        data.Email
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
        data.PostalCode,
        data.PhoneArea,
        data.PhoneNumber
      );
      response.send(resp);
    });
  }
);

exports.update = location_functions.https.onRequest(
  async (request: any, response: any) => {
    return location_cors(request, response, async () => {
      const data = JSON.parse(request.body);
      const resp = await LocationBO.update(
        location_admin,
        data.VendorModel.Id,
        data.Name,
        data.City,
        data.State,
        data.Latitude,
        data.Longitude,
        data.Address,
        data.PostalCode,
        data.PhoneArea,
        data.PhoneNumber,
        data.Id,
        data.CreatedDate
      );
      response.send(resp);
    });
  }
);

exports.delete = location_functions.https.onRequest(
  async (request: any, response: any) => {
    return location_cors(request, response, async () => {
      const data = JSON.parse(request.body);
      const resp = await LocationBO.delete(location_admin, data.LocationId);
      response.send(resp);
    });
  }
);
