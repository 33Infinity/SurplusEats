"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inventory_functions = require("firebase-functions");
const inventory_admin = require("firebase-admin");
const inventory_cors = require("cors")({
  origin: true,
});
import SqlHelper from "./utils/SqlHelper";
import GeoLocationHelper from "./utils/GeoLocationHelper";
import HttpHelper from "./utils/HttpHelper";
import LocationTO from "./datastore/TO/Location";
import VendorTO from "./datastore/TO/Vendor";
import IResponse from "./IResponse";
import InventoryDAO from "./datastore/DAO/Inventory";
import VendorDAO from "./datastore/DAO/Vendor";
import LocationDAO from "./datastore/DAO/Location";

exports.getByLocation = inventory_functions.https.onRequest(
  async (request: any, response: any) => {
    return inventory_cors(request, response, async () => {
      let retObj: IResponse = {};
      const data = JSON.parse(request.body);
      const latitude = data.Latitude;
      const longitude = data.Longitude;
      let locations = await SqlHelper.get(
        inventory_admin,
        LocationTO.TableName
      );
      const closestLocations = GeoLocationHelper.GetClosestNLocations(
        latitude,
        longitude,
        locations,
        10
      );
      let inventory = await InventoryDAO.getInventoryByLocations(
        inventory_admin,
        closestLocations
      );
      retObj.Inventory = inventory;
      retObj.Locations = closestLocations;
      retObj.Vendors = await VendorDAO.getVendorByLocations(
        inventory_admin,
        closestLocations
      );
      retObj = InventoryDAO.Normalize(retObj);
      response.send(HttpHelper.buildResponse(retObj));
    });
  }
);

exports.getByVendor = inventory_functions.https.onRequest(
  async (request: any, response: any) => {
    return inventory_cors(request, response, async () => {
      let retObj: IResponse = {};
      const vendorId = JSON.parse(request.body);
      const vendors = await SqlHelper.getById(
        inventory_admin,
        VendorTO.TableName,
        vendorId
      );
      const locations = await LocationDAO.getLocationsByVendor(
        inventory_admin,
        vendorId
      );
      const inventory = await InventoryDAO.getInventoryByLocations(
        inventory_admin,
        locations
      );
      retObj.Inventory = inventory;
      retObj.Locations = locations;
      retObj.Vendors = vendors;
      retObj = InventoryDAO.Normalize(retObj);
      response.send(HttpHelper.buildResponse(retObj));
    });
  }
);
