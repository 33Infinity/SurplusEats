+"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inventory_functions = require("firebase-functions");
const inventory_admin = require("firebase-admin");
const inventory_cors = require("cors")({
  origin: true,
});
import SqlHelper from "./utils/SqlHelper";
import VendorTable from "./datastore/Vendor";
import InventoryTable from "./datastore/Inventory";
import LocationTable from "./datastore/Location";
import Clause from "./datastore/Clause";
import Operators from "./datastore/Operators";

exports.getByLocation = inventory_functions.https.onRequest(
  async (request: any, response: any) => {
    return inventory_cors(request, response, async () => {
      const inventory = await inventory_admin
        .firestore()
        .collection("inventory")
        .get();
      response.send(JSON.stringify(inventory.docs.map((doc) => doc.data())));
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
      /* const inventory = await inventory_admin
        .firestore()
        .collection("inventory")
        .get();
      response.send(JSON.stringify(inventory.docs.map((doc) => doc.data()))); */
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
  clauses.push(
    Clause.NewClause(InventoryTable.LocationId, Operators.in, locationArray)
  );
  const query = SqlHelper.getWithClauses(
    inventory_admin,
    LocationTable.TableName,
    clauses
  );
  const response = await query.get();
  return response.docs.map((doc) => doc.data());
}
