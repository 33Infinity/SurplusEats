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
import LocationTable from "./datastore/TO/Location";
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
        LocationTable.TableName
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
      const vendorId = request.data.Id;
      const vendor = await VendorDAO.getVendorById(inventory_admin, vendorId);
      const locations = await LocationDAO.getLocationsByVendor(
        inventory_admin,
        vendorId
      );
      const inventory = await InventoryDAO.getInventoryByLocations(
        inventory_admin,
        locations
      );
      inventory.forEach((eachInventory) => {
        eachInventory.VendorModel = vendor;
        const location = locations.find(
          (eachLocation) => eachLocation.Id === eachInventory.LocationId
        );
        eachInventory.LocationModel = location;
      });
      response.send(JSON.stringify(inventory));
    });
  }
);
