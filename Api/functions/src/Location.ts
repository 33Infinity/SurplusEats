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

exports.getByVendor = location_functions.https.onRequest(
  async (request: any, response: any) => {
    return location_cors(request, response, async () => {
      let retObj: IResponse = {};
      const data = JSON.parse(request.body);
      const vendorId = data.VendorId;
      const vendors = await SqlHelper.getById(
        location_admin,
        VendorTO.TableName,
        vendorId
      );
      const locations = await LocationDAO.getLocationsByVendor(
        location_admin,
        vendorId
      );
      retObj.Locations = locations;
      retObj.Vendor = vendors;
      response.send(HttpHelper.buildResponse(retObj));
    });
  }
);
