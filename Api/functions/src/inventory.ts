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
import VendorTable from "./datastore/Vendor";
import InventoryTable from "./datastore/Inventory";
import LocationTable from "./datastore/Location";
import Clause from "./datastore/Clause";
import Operators from "./datastore/Operators";

/*How to search for a given document id
db.collection('inventory').doc('fK3ddutEpD2qQqRMXNW5').get()*/

exports.getByLocation = inventory_functions.https.onRequest(
  async (request: any, response: any) => {
    return inventory_cors(request, response, async () => {
      const data = JSON.parse(request.body);
      const latitude = data.Latitude;
      const longitude = data.Longitude;
      let query = SqlHelper.get(inventory_admin, LocationTable.TableName);
      const locations = await query.get();
      const closestLocations = GeoLocationHelper.GetClosestNLocations(
        latitude,
        longitude,
        locations,
        10
      );
      let inventory = getInventoryByLocations(closestLocations);
      /* const locationArray: string[] = [];
      closestLocations.forEach((location) => {
        locationArray.push(location.id);
      });
      const clauses: Clause[] = [];
      clauses.push(
        Clause.NewClause(InventoryTable.LocationId, Operators.in, locationArray)
      );
      query = SqlHelper.getWithClauses(
        inventory_admin,
        InventoryTable.TableName,
        clauses
      );
      const inventory = await query.get(); */
      inventory.Locations = closestLocations;
      response.send(HttpHelper.buildResponse(inventory));
    });
  }
);

exports.getByVendor = inventory_functions.https.onRequest(
  async (request: any, response: any) => {
    return inventory_cors(request, response, async () => {
      const vendorId = request.data.Id;
      const vendor = await getVendorById(vendorId);
      const locations = await getLocationsByVendor(vendorId);
      const inventory = await getInventoryByLocations(locations);
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

async function getVendorById(aVendorId) {
  const clauses: Clause[] = [];
  clauses.push(Clause.NewClause(VendorTable.Id, Operators.equals, aVendorId));
  const query = SqlHelper.getWithClauses(
    inventory_admin,
    VendorTable.TableName,
    clauses
  );
  const response = await query.get();
  return response.docs.map((doc) => doc.data());
}

async function getLocationsByVendor(aVendorId) {
  const clauses: Clause[] = [];
  clauses.push(
    Clause.NewClause(LocationTable.VendorId, Operators.equals, aVendorId)
  );
  const query = SqlHelper.getWithClauses(
    inventory_admin,
    LocationTable.TableName,
    clauses
  );
  const response = await query.get();
  return response.docs.map((doc) => doc.data());
}

async function getInventoryByLocations(someLocations) {
  const locationArray: string[] = [];
  someLocations.forEach((location) => {
    locationArray.push(location.Id);
  });
  const clauses: Clause[] = [];
  const locationInValue = SqlHelper.buildInFromArray(locationArray);
  clauses.push(
    Clause.NewClause(InventoryTable.LocationId, Operators.in, locationInValue)
  );
  const query = SqlHelper.getWithClauses(
    inventory_admin,
    LocationTable.TableName,
    clauses
  );
  const response = await query.get();
  return response.docs.map((doc) => doc.data());
}
